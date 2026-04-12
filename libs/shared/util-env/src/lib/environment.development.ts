import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://swderoos:swWelkom01!@footballdbcluster.vsocs.mongodb.net/',
    NEO4J_URI: 'neo4j+s://98870026.databases.neo4j.io',
    NEO4J_USER: '98870026',
    NEO4J_PASSWORD: '8eJ-M_l051tvUwhWrlGnIDCRXx1aHI02fcI7jJaQoEE',
};
