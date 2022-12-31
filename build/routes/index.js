"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var resize_1 = __importDefault(require("./api/resize"));
var path_1 = __importDefault(require("path"));
// create router
var routes = (0, express_1.Router)();
// define root route
routes.get("/", function (req, res) {
    res.send(path_1.default.resolve("./"));
});
// mount resizeImages router
routes.use("/resize", resize_1.default);
// export router
exports.default = routes;
