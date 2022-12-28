"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// void ?? - research
// create custom middleware function named logger
var logger = function (req, res, next) {
    var url = req.url; // capture endpoint
    console.log("".concat(url, " was visited")); // log endpoint onto terminal/console when endpoint is visited
    next();
};
exports.default = logger;
