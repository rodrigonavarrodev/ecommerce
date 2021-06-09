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

// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());


// here we are adding middleware to allow cross-origin requests
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

// here we are crashing on unhandled errors and spitting out a stack trace,
// but only when in debug mode
if (process.env.DEBUG) {
    process.on('unhandledRejection', function(reason) {
        debugLog('Unhandled Rejection:', reason);
        process.exit(1);
    });
} else {
    loggerOptions.meta = false; // when not debugging, make terse
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

Router.init(app);

export default app;
