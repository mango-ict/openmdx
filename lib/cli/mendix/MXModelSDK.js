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
            const allModules = workingCopy.model().allModules();
            allModules.map((module, index, projects) => __awaiter(this, void 0, void 0, function* () {
                let pages = yield module.model.allPages();
                let modulePath = path + module.name;
                try {
                    fs.statSync(modulePath);
                }
                catch (e) {
                    fs.mkdirSync(modulePath);
                }
                modulePath += '/';
                console.log("We have setup directory: " + modulePath);
                console.log("we have found: " + pages.length + " of pages.");
                pages.map((page, index, pages) => __awaiter(this, void 0, void 0, function* () {
                    const domainModel = yield mendixplatformsdk_1.loadAsPromise(page);
                    let pagePath = modulePath + page.name + '.js';
                    console.log("Try to load: " + page.name + " and save it to: " + pagePath);
                    try {
                        fs.statSync(pagePath);
                        fs.unlink(pagePath);
                    }
                    catch (e) {
                    }
                    let js = mendixmodelsdk_1.JavaScriptSerializer.serializeToJs(domainModel); //print out the generated JavaScript
                    fs.writeFileSync(pagePath, js);
                }));
            }));
        });
    }
}
exports.MXModelSDK = MXModelSDK;
