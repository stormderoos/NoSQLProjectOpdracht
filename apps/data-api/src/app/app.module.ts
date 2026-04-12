import { Module, Logger } from '@nestjs/common';

// Splits "neo4j+s://host:port" into { scheme, host, port } voor nest-neo4j
function parseNeo4jUri(uri: string): { scheme: any; host: string; port: number } {
  const match = uri.match(/^([a-z0-9+]+):\/\/([^:/]+)(?::(\d+))?/);
  if (!match) throw new Error(`Ongeldige NEO4J_URI: ${uri}`);
  return {
    scheme: match[1] as any,
    host: match[2],
    port: match[3] ? parseInt(match[3], 10) : 7687,
  };
}
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
      ...parseNeo4jUri(environment.NEO4J_URI),
      username: environment.NEO4J_USER,
      password: environment.NEO4J_PASSWORD,
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
