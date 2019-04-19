"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  Licensed to the Mango ICT software company under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
*/
/*global module, require, console */
var prompt = require("prompt");
var clear = require("clear");
var chalk = require("chalk");
var intro_1 = require("./intro");
var lang_1 = require("./resources/lang");
var resource = new lang_1.Resources().lang("en_EN");
var Cli = /** @class */ (function () {
    function Cli() {
    }
    Cli.prototype.push = function () {
        // TODO push something
    };
    Cli.prototype.intro = function () {
        clear();
        var intro = new intro_1.Intro();
        intro.show(resource.CLI_INFO, function () {
            console.log(resource.CLI_SLOGAN);
            console.log(resource.CLI_HELP_ASSIST);
            console.log(resource.EMPTY);
        });
    };
    Cli.prototype.pwd = function () {
        console.log(__dirname);
    };
    Cli.prototype.init = function () {
        clear();
        var intro = new intro_1.Intro();
        intro.show(resource.CLI_INFO, function () {
            console.log(resource.EMPTY);
            console.log(resource.CLI_PROJECT_SETTINGS);
            prompt.start();
            prompt.message = resource.EMPTY;
            prompt.delimiter = chalk.green(" >> ");
            prompt.get([{
                    name: "projectname",
                    required: true
                }, {
                    name: "version",
                    required: true
                }, {
                    name: "website",
                    required: true
                }, {
                    name: "author",
                    required: true
                }], function (err, result) {
                // TODO get boilerplate
            });
        });
    };
    return Cli;
}());
exports.Cli = Cli;
