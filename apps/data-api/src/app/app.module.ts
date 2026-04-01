import { Module, Logger } from '@nestjs/common';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          Logger.verbose(`Mongoose connected to ${environment.MONGO_DB_CONNECTION_STRING}`);
        });
        return connection;
      },
    }),
    UsersModule
  ],
})
export class AppModule {}