const APP_PORT = process.env.APP_PORT;
const DB_URL = process.env.DB_URL;
const ENVIRONMENT = process.env.ENVIRONMENT;



const whitelist = [`*`];

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('You are very chalak bro.....'));
        }
    },
    credentials: true
};


export {
    APP_PORT,
    DB_URL,
    ENVIRONMENT,
    corsOptions
}