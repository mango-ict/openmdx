import { ModelSdkClient, IModel, projects, IModelUnit, domainmodels, JavaScriptSerializer, IStructure } from "mendixmodelsdk";
import { MendixSdkClient, Project, OnlineWorkingCopy, loadAsPromise } from "mendixplatformsdk";
let fs = require("fs");


class MXModelSDK {

    async init(path: string, mxUsername: string, mxApiKey: string, projectName: string, projectId: string) {

        let client = new MendixSdkClient(mxUsername, mxApiKey);
        let project = new Project(client, projectId, projectName);

        const workingCopy = await project.createWorkingCopy();

        workingCopy.model().allDomainModels().forEach(async domainModel => {

            let modulePath = path + getModule(domainModel).name;

            try {
                fs.statSync(modulePath);
            } catch (e) {
                fs.mkdirSync(modulePath);
            }

            const pageModels = workingCopy.model().allPages().filter(page => {
                return getModule(page).name === getModule(domainModel).name;
            });

            const layoutModels = workingCopy.model().allLayouts().filter(layout => {
                return getModule(layout).name === getModule(domainModel).name;
            });

            console.log("We have setup directory: " + modulePath);
            console.log("-> We have found: " + pageModels.length + " of pages.");

            let i: any;
            try {
                for (i in pageModels) {
                    const pageModel = await loadAsPromise(pageModels[i]);
                    let pagePath = modulePath + "/" + pageModel.name + '.json';
                    fs.writeFileSync(pagePath, JSON.stringify(pageModel));
                    console.log('Written page: ' + getModule(pageModel).name + '/' + pageModel.name + '.json');
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }

            try {
                for (i in layoutModels) {
                    const layoutModel = await loadAsPromise(layoutModels[i]);
                    let layoutPath = modulePath + "/Layout_" + layoutModel.name + '.json';
                    fs.writeFileSync(layoutPath, JSON.stringify(layoutModel));
                    console.log('Written layout: ' + getModule(layoutModel).name + '/Layout_' + layoutModel.name + '.json');
                }
            } catch (error) {
                console.log(`error: ${error}`);
            }

        });


        function getModule(element: IStructure): projects.Module {
            let current = element.unit;
            while (current) {
                if (current instanceof projects.Module) {
                    return current;
                }
                current = current.container;
            }
            return current;
        }
    }

}

export { MXModelSDK };