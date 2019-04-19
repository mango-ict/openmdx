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
const prompt = require("prompt");
const clear = require("clear");
const chalk = require("chalk");
const fs = require("fs");

import { Intro } from "./intro";
import { Resources } from "./resources/lang";
import { MXModelSDK } from "./mendix/MXModelSDK";

let resource = new Resources().lang("en_EN");

class Cli {

    push() {
        // TODO push something
    }

    intro() {
        clear();
        let intro = new Intro();
        intro.show(resource.CLI_INFO, () => {
            console.log(resource.CLI_SLOGAN);
            console.log(resource.CLI_HELP_ASSIST);
            console.log(resource.EMPTY);
        });
    }

    pwd() {
        console.log(process.cwd());
    }

    init() {
        clear();
        let intro = new Intro();
        intro.show(resource.CLI_INFO, () => {
            console.log(resource.EMPTY);
            console.log(resource.CLI_PROJECT_SETTINGS);
            prompt.start();
            prompt.message = resource.EMPTY;
            prompt.delimiter = chalk.green(" >> ");
            prompt.get([{
                name: "name",
                required: true
            }, {
                name: "version",
                required: true
            }, {
                name: "author",
                required: true
            }, {
                name: "mendixusername",
                required: true
            }, {
                name: "mendixapikey",
                required: true
            }, {
                name: "mendixproject",
                required: true
            }, {
                name: "mendixprojectid",
                required: true
            }], (err: string, result: object) => {

                const directory = (process.cwd() + '/.mendix');

                try {
                    fs.statSync(directory);
                    fs.unlinkSync(directory);
                    fs.mkdirSync(directory);
                } catch (e) {
                    fs.mkdirSync(directory);
                }

                fs.writeFileSync(directory + '/config.json', JSON.stringify(result));

                console.log(resource.EMPTY);
                console.log(result);

            });
        });
    }

    fetch() {
        clear();
        let intro = new Intro();
        intro.show(resource.CLI_INFO, () => {
            console.log(resource.EMPTY);
            console.log(resource.CLI_FETCH);

            const mx = new MXModelSDK();
            const directory = (process.cwd() + '/.mendix');
            const projectDirectory = directory + "/project/";
            const configuration = require(directory + "/config.json");

            console.log('Setting up project folder:' + projectDirectory);
            try {
                fs.statSync(projectDirectory);
            } catch (e) {
                fs.mkdirSync(projectDirectory);
            }

            mx.init(projectDirectory, configuration.mendixusername, configuration.mendixapikey, configuration.mendixproject, configuration.mendixprojectid);
        });
    }
}

export { Cli };