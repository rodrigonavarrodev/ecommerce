"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const routes_1 = __importDefault(require("./routes"));
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const app = express_1.default();
//const routes: Array<CommonRoutesConfig> = [];
const debugLog = debug_1.default('app');
// valida request como json
app.use(express_1.default.json());
// cors
app.use(cors_1.default({ origin: (origin, callback) => callback(null, true), credentials: true }));
//Handelbars
app.engine('hbs', express_handlebars_1.default({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
//motor de plantilla
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express_1.default.static('public'));
//renderizar vista
app.get('/chat', function (req, res) {
    res.render('form');
});
//configuracion de Winston
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
//debug
if (process.env.DEBUG) {
    process.on('unhandledRejection', function (reason) {
        debugLog('Unhandled Rejection:', reason);
        process.exit(1);
    });
}
else {
    loggerOptions.meta = false;
}
// inicializar Winston
app.use(expressWinston.logger(loggerOptions));
//rutas
routes_1.default.init(app);
exports.default = app;
//# sourceMappingURL=app.js.map