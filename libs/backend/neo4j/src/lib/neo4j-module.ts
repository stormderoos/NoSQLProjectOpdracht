import { Global, Module } from '@nestjs/common';
import { Neo4jModule as NestNeo4jModule } from 'nest-neo4j';
import { environment } from '@avans-nx-workshop/shared/util-env'; 

@Global()
@Module({
  imports: [
    NestNeo4jModule.forRoot({
      scheme: 'bolt',
      host: 'localhost',
      port: '7687',
      username: 'neo4j',
      password: 'swWelkom01!',
    }),
  ],
  exports: [NestNeo4jModule], 
})
export class Neo4jModule {}