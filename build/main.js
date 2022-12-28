"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("./utilities/logger"));
var app = (0, express_1.default)();
var port = 3000;
var api = "/test";
// create an api
app.get(api, logger_1.default, function (req, res) {
    // send response
    res.send("API test successful!");
});
// start the Express server
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
exports.default = app;
