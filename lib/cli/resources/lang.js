"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resources = /** @class */ (function () {
    function Resources() {
    }
    Resources.prototype.lang = function (lng) {
        var en_EN_Content = {
            EMPTY: "",
            CLI_INFO: "OpenMDX - CLI",
            CLI_SLOGAN: "We let you export your Mendix Model to full blown open source applications",
            CLI_HELP_ASSIST: "When you want more information please add --help as your first parameter.",
            CLI_LOGIN_CREDENTIALS: "Please enter your login credentials",
            CLI_PROJECT_SETTINGS: "Please enter project settings"
        };
        var resources = {
            en_EN: en_EN_Content
        };
        return resources[lng];
    };
    return Resources;
}());
exports.Resources = Resources;
