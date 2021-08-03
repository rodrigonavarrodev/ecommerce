import debug from "debug";
import config from "../../../config/config";
import nodemailer from "nodemailer";

const log: debug.IDebugger = debug("app:products-service");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brock.krajcik25@ethereal.email",
    pass: `${config.nodemailerPass}`,
  },
});

/* const mailOptiones = {
  from: "Ecommerce Coder",
  to: "rodrigonavarrodg@gmail.com",
  subject: "Bienvenido al Ecommerce",
  html: "<h1>Probando</h1>",
}; */

class MailsService {
  async sendMail(mailOptiones: MailsModel.sendMail) {
    try {
      await transporter.sendMail(mailOptiones);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MailsService();
