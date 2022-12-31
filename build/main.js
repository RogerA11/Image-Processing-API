"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
// create an instance of the express application
var app = (0, express_1.default)();
// set the port number for the server
var port = 3000;
// mount the router object
app.use(index_1.default);
// start the server
app.listen(port, function () {
    console.log("Server started at http://localhost:".concat(port));
});
// export the app object
exports.default = app;
