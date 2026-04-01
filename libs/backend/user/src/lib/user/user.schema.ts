import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackError, Document } from 'mongoose';
import { UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.User,
  })
  role!: UserRole;

  @Prop({
    required: false,
    default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
  })
  profileImgUrl!: string;

  @Prop({
    type: String,
    required: false,
    enum: Object.values(UserGender),
    default: UserGender.Unknown,
  })
  gender!: UserGender;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err as CallbackError); 
  }
});