const Timestamp = require("./time_format");
const SendMail = require("../bots/mail_bot/mailbot");

const LogCollor = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m"
};

class Loger {
  log(msg) {
    const date = Date.now();
    const timestamp = Timestamp.timeConverter(date);
    const { FgGreen, Bright } = LogCollor;
    console.log(FgGreen, Bright, `[*] ${msg} | ${timestamp} [*]`);
  }
  errlog(msg) {
    const date = Date.now();
    const timestamp = Timestamp.timeConverter(date);
    const { FgRed, Bright } = LogCollor;
    console.log(FgRed, Bright, `[-] ${msg} | ${timestamp}  [-]`);
  }
  async mailErrorlog(msg, err) {
    const date = Date.now();
    const timestamp = Timestamp.timeConverter(date);
    const { FgRed, Bright } = LogCollor;
    console.log(FgRed, Bright, `[-] ${msg} | ${timestamp}  [-]`);
    console.log(err);
    const res = await SendMail.Errormail(err);
    if (res) {
      this.log(`Email was Send`);
    } else {
      this.errlog(`Faile to send mail `);
    }
  }
}

module.exports = new Loger();
