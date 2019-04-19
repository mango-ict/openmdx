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
interface IResources {
    lang(lng: string): IResourcesContent;
}

interface IResourcesValues {
    [key: string]: IResourcesContent;
}

interface IResourcesContent {
    EMPTY:string,
    CLI_INFO:string,
    CLI_SLOGAN:string,
    CLI_HELP_ASSIST:string,
    CLI_LOGIN_CREDENTIALS:string,
    CLI_PROJECT_SETTINGS:string,
    CLI_FETCH:string
}

class Resources implements IResources {
    
    lang(lng:string) {

        let en_EN_Content:IResourcesContent = {
            EMPTY: "",
            CLI_INFO: "OpenMDX - CLI",
            CLI_SLOGAN: "We let you export your Mendix Model to full blown open source applications",
            CLI_HELP_ASSIST: "When you want more information please add --help as your first parameter.",
            CLI_LOGIN_CREDENTIALS: "Please enter your login credentials",
            CLI_PROJECT_SETTINGS: "Please enter project settings",
            CLI_FETCH: "We will start fetching your Mendix project"
        };

        let resources:IResourcesValues = {
            en_EN: en_EN_Content
        };

        return resources[lng];
    }
}

export { Resources };