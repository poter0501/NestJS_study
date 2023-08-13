import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.HOSTNAME || dbConfig.host,
    port: process.env.PORT || dbConfig.port,
    username: process.env.USEERNAME || dbConfig.username,
    password: process.env.PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: dbConfig.synchronize
}
// export const typeORMConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'postgres',
//     database: 'board-app',
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: true
// }