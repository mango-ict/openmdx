"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var figlet = require('figlet');
var chalk = require('chalk');
var Intro = /** @class */ (function () {
    function Intro() {
    }
    Intro.prototype.show = function (msg, cb) {
        figlet(msg, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(chalk.yellow(data));
            cb();
        });
        return true;
    };
    return Intro;
}());
exports.Intro = Intro;
