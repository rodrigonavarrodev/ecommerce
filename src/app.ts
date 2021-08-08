import express from 'express'
import * as http from 'http'

import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import path from 'path'
import handlebars from 'express-handlebars'

import Router from './routes'
import debug from 'debug'
import { config as dotenv } from 'dotenv'

dotenv();

const app: express.Application = express();

//const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// valida request como json
app.use(express.json());

// cors
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

/* //Handelbars
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: './views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)

//motor de plantilla
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.static('public'))

//renderizar vista
app.get('/chat', function (req, res) {
    res.render('form')
}) */

//configuracion de Winston
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

//debug
if (process.env.DEBUG) {
    process.on('unhandledRejection', function(reason) {
        debugLog('Unhandled Rejection:', reason);
        process.exit(1);
    });
} else {
    loggerOptions.meta = false;
}

// inicializar Winston
app.use(expressWinston.logger(loggerOptions));

//rutas
Router.init(app);

export default app;
