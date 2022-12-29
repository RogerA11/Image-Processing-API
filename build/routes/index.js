"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var resize_1 = __importDefault(require("./api/resize"));
var path_1 = __importDefault(require("path"));
var routes = (0, express_1.Router)();
routes.get("/", function (req, res) {
    res.send(path_1.default.resolve("./"));
});
routes.use("/resize", resize_1.default);
exports.default = routes;