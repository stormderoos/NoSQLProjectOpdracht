import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUserCredentials, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { CreateUserDto } from '@avans-nx-workshop/backend/dto';
import { Neo4jUsersService } from '@avans-nx-workshop/backend/neo4j';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel('User') private userModel: Model<any>,
    private jwtService: JwtService,
    private neo4jUsersService: Neo4jUsersService,
  ) {}

  async login(credentials: IUserCredentials): Promise<IUserIdentity> {
    this.logger.log('login ' + credentials.email);

    const user = await this.userModel
      .findOne({ email: credentials.email })
      .select('+password')
      .exec();

    if (user && await bcrypt.compare(credentials.password, user.password)) {
      const payload = {
        user_id: user._id,
        role: user.role,
      };

      return {
        id: user.id,
        name: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        role: user.role,
        token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Email not found or password invalid');
  }

  async register(dto: CreateUserDto): Promise<IUserIdentity> {
    this.logger.log(`Register user ${dto.username}`);

    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) {
      this.logger.debug('User already exists');
      throw new ConflictException('User already exists');
    }

    // Sla gebruiker op in MongoDB (pre-save hook hasht het wachtwoord)
    const newUser = await this.userModel.create({ ...dto });

    const payload = {
      user_id: newUser._id,
      role: newUser.role,
    };

    // Maak ook een Neo4j node aan voor deze gebruiker
    // Als Neo4j faalt, loggen we de fout maar geven we wel de identity terug
    // zodat de registratie niet blokkeert door een Neo4j probleem (Q3)
    try {
      await this.neo4jUsersService.createUserNode(
        newUser._id.toString(),
        newUser.username,
      );
      this.logger.log(`Neo4j node created for user ${newUser._id}`);
    } catch (err) {
      this.logger.error(
        `Failed to create Neo4j node for user ${newUser._id}: ${err}`,
      );
      // MongoDB user is al aangemaakt, we gaan door maar loggen de fout
    }

    return {
      id: newUser.id,
      name: newUser.username,
      email: newUser.email,
      profileImgUrl: newUser.profileImgUrl,
      role: newUser.role,
      token: this.jwtService.sign(payload),
    };
  }
}
