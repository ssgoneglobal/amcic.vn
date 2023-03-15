import path from 'path';
import dotenv from 'dotenv-safe';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import compress from 'compression';
import cors from 'cors';
import hbs from 'hbs';
import i18next from 'i18next';
import passport from 'passport';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

import { fileURLToPath } from 'url';


import appRoutes from './routes/index.route.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, './.env'),
    example: path.join(__dirname, './.env.example'),
});

const vars = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    mongo: {
        uri: process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    cookieSecret: process.env.COOKIE_SECRET,
    sessionSecret: process.env.SESSION_SECRET
};


hbs.registerHelper('t', function () {
    var args = Array.prototype.slice.call(arguments);
    var options = args.pop();
    return i18next.t(args, { lng: options.data.root._locals.language });
});

hbs.registerHelper('tr', function (context, options) {
    var opts = i18next.functions.extend(options.hash, context);
    if (options.fn) opts.defaultValue = options.fn(context);

    var result = i18next.t(opts.key, opts);

    return new hbs.SafeString(result);
});

const app = express();


/* View */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main', layoutDir: 'layouts' });

app.use(morgan(vars.logs));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(vars.cookieSecret));

app.use(compress());
app.use(cors());

/* Session */
app.use(session({
    secret: vars.sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: vars.mongo.uri,
        collection: 'sessions'
    })
}));

/* Flash */
app.use(flash());

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

hbs.registerHelper('t', function () {
    var args = Array.prototype.slice.call(arguments);
    var options = args.pop();
    return i18next.t(args, { lng: options.data.root._locals.language });
});


hbs.registerHelper('formatDate', function (datetime, format) {
    if (moment) {
        format = 'YYYY-MM-D';
        return moment(datetime).format(format);
    }
    else {
        return datetime;
    }
})

//hbs helper

hbs.registerHelper('tr', function (context, options) {
    var opts = i18next.functions.extend(options.hash, context);
    if (options.fn) opts.defaultValue = options.fn(context);

    var result = i18next.t(opts.key, opts);

    return new hbs.SafeString(result);
});


hbs.registerHelper('ifCond', function (v1, operator, v2, opts) {
    let isTrue = false;
    switch (operator) {
        case '==':
            isTrue = v1 == v2;
            break;
        case '===':
            isTrue = v1 === v2;
            break;
        case '!==':
            isTrue = v1 !== v2;
            break;
        case '<':
            isTrue = v1 < v2;
            break;
        case '<=':
            isTrue = v1 <= v2;
            break;
        case '>':
            isTrue = v1 > v2;
            break;
        case '>=':
            isTrue = v1 >= v2;
            break;
        case '||':
            isTrue = v1 || v2;
            break;
        case '&&':
            isTrue = v1 && v2;
            break;
    }
    return isTrue ? opts.fn(this) : opts.inverse(this);
});

/* Mongo Connection */
mongoose.Promise = Promise;
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});
if (vars.env === 'development') mongoose.set('debug', true);
mongoose.connect(vars.mongo.uri, {
    keepAlive: true
}).then(() => console.info('mongoDB connected...'));


/* Static files */
app.use(express.static(path.join(__dirname, 'public')));

/* Routers */
app.use('/', appRoutes);


app.listen(vars.port, () => console.info(`Server started on port ${vars.port} (${vars.env})`));
export default app;
