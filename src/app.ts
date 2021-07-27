import express from 'express'
import * as http from 'http'

import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'

import Router from './routes'
import debug from 'debug'
import { config as dotenv } from 'dotenv'

dotenv();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
//const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// valida request como json
app.use(express.json());


// cors
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

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
