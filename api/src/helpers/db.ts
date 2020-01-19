const creds = process.env.dev == 'true' ? 
    require('../config.docker.json') : 
    require('../config.json');

import { connect, connection } from "mongoose";

export const connectDb = async () => {
    const dbConfig = creds.db;
    let tries = 5;
    const usernamePassword = dbConfig.username ? `${dbConfig.username}:${dbConfig.password}@` : ``;

    connection.on('connected', function() {
        console.log('CONNECTED TO DB');
    });

    while(tries > 0) {
        try {
            await connect(
                `mongodb://${usernamePassword}${dbConfig.url}`,
                { useNewUrlParser: true }
            );
            break;
        } catch(e) {
            console.log(e);
            console.log('failed to connect to db: ', tries);
            tries --;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}
