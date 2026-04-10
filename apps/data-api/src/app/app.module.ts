import { Module, Logger } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j';
import { AuthGuard } from '@avans-nx-workshop/backend/auth';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          Logger.verbose('MongoDB connected!', 'MongooseModule');
        });
        connection.on('disconnected', () => {
          Logger.verbose('MongoDB disconnected!', 'MongooseModule');
        });
        return connection;
      },
    }),
    Neo4jModule.forRoot({
      scheme: 'bolt',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'swWelkom01!',
    }),
    UsersModule,
    Neo4jBackendModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
