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
/*global console, process, module, require */
import { Cli } from "./cli/cli";
var pjson = require('../package.json');

class SystemOpenMDX {

    exec() {
        // Init cli
        let cli = new Cli();

        // Process commandline arguments
        if (process.argv.length === 2) {
            cli.intro();
        } else {
            process.argv.forEach(function (val, index, array) {
                switch (val) {
                    case "--version":
                        console.log("current version is: " + pjson.version);
                        break;
                    case "pwd":
                        cli.pwd();
                        break;
                    case "init":
                        cli.init();
                        break;
                    case "fetch":
                        cli.fetch();
                        break;
                    case "push":
                        cli.push();
                        break;
                }
            });
        }
    }
}

export { SystemOpenMDX };