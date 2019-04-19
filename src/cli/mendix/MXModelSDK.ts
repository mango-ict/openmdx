import { ModelSdkClient, IModel, IModelUnit, domainmodels, JavaScriptSerializer } from "mendixmodelsdk";
import { MendixSdkClient, Project, OnlineWorkingCopy, loadAsPromise } from "mendixplatformsdk";
let fs = require("fs");

class MXModelSDK {

    async init(path: string, mxUsername: string, mxApiKey: string, projectName: string, projectId: string) {

        let client = new MendixSdkClient(mxUsername, mxApiKey);
        let project = new Project(client, projectId, projectName);

        const workingCopy = await project.createWorkingCopy();
        const allModules = workingCopy.model().allModules()

        allModules.map(async (module, index, projects) => {
            let pages = await module.model.allPages();

            let modulePath = path + module.name;

            try {
                fs.statSync(modulePath);
            } catch (e) {
                fs.mkdirSync(modulePath);
            }

            modulePath += '/';
            console.log("We have setup directory: " + modulePath);
            console.log("we have found: " + pages.length + " of pages.");

            pages.map(async (page, index, pages) => {
                const domainModel = await loadAsPromise(page);

                let pagePath = modulePath + page.name + '.js';

                console.log("Try to load: " + page.name + " and save it to: " + pagePath);

                try {
                    fs.statSync(pagePath);
                    fs.unlink(pagePath);
                } catch (e) {
                }

                let js = JavaScriptSerializer.serializeToJs(domainModel); //print out the generated JavaScript
                fs.writeFileSync(pagePath, js);


            })
        })
    }

}

export { MXModelSDK };