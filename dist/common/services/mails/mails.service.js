"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const config_1 = __importDefault(require("../../../config/config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const log = debug_1.default("app:products-service");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "brock.krajcik25@ethereal.email",
        pass: `${config_1.default.nodemailerPass}`,
    },
});
/* const mailOptiones = {
  from: "Ecommerce Coder",
  to: "rodrigonavarrodg@gmail.com",
  subject: "Bienvenido al Ecommerce",
  html: "<h1>Probando</h1>",
}; */
class MailsService {
    sendMail(mailOptiones) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transporter.sendMail(mailOptiones);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new MailsService();
//# sourceMappingURL=mails.service.js.map