// EXPORTING AFTER IMPORT
export * from "./env.vars.js";
export * from "./db.connection.js";




// CORS CONF
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
    corsOptions,
}