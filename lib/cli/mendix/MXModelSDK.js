"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mendixmodelsdk_1 = require("mendixmodelsdk");
const mendixplatformsdk_1 = require("mendixplatformsdk");
let fs = require("fs");
class MXModelSDK {
    init(path, mxUsername, mxApiKey, projectName, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new mendixplatformsdk_1.MendixSdkClient(mxUsername, mxApiKey);
            let project = new mendixplatformsdk_1.Project(client, projectId, projectName);
            const workingCopy = yield project.createWorkingCopy();
            workingCopy.model().allDomainModels().forEach((domainModel) => __awaiter(this, void 0, void 0, function* () {
                let modulePath = path + getModule(domainModel).name;
                try {
                    fs.statSync(modulePath);
                }
                catch (e) {
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
                let i;
                try {
                    for (i in pageModels) {
                        yield mendixplatformsdk_1.loadAsPromise(pageModels[i]).then((pageModel) => {
                            let pagePath = modulePath + "/" + pageModel.name + '.js';
                            fs.writeFileSync(pagePath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(pageModel));
                            console.log('Written page: ' + getModule(pageModel).name + '/' + pageModel.name + '.js');
                        });
                    }
                }
                catch (error) {
                    console.log(`error: ${error}`);
                }
                try {
                    for (i in layoutModels) {
                        yield mendixplatformsdk_1.loadAsPromise(layoutModels[i]).then((layoutModel) => {
                            let layoutPath = modulePath + "/Layout_" + layoutModel.name + '.js';
                            fs.writeFileSync(layoutPath, mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(layoutModel));
                            console.log('Written layout: ' + getModule(layoutModel).name + '/Layout_' + layoutModel.name + '.js');
                        });
                    }
                }
                catch (error) {
                    console.log(`error: ${error}`);
                }
            }));
            function getModule(element) {
                let current = element.unit;
                while (current) {
                    if (current instanceof mendixmodelsdk_1.projects.Module) {
                        return current;
                    }
                    current = current.container;
                }
                return current;
            }
        });
    }
}
exports.MXModelSDK = MXModelSDK;
