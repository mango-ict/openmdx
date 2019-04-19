"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let figlet = require('figlet');
let chalk = require('chalk');
class Intro {
    show(msg, cb) {
        figlet(msg, (err, data) => {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(chalk.yellow(data));
            cb();
        });
        return true;
    }
}
exports.Intro = Intro;
