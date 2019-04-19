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

import { Intro } from "./intro";
import { Resources } from "./resources/lang";

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
            }], (err: string, result: object) => {

                // TODO get boilerplate

            });
        });
    }

}

export { Cli };