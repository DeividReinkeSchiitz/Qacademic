"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var mongoose_1 = __importDefault(require("mongoose"));
var router_1 = __importDefault(require("./router"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.middlewares();
    }
    App.prototype.middlewares = function () {
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
        this.app.use(express_1.default.json());
        this.databaseConnection();
        this.app.use(router_1.default);
    };
    App.prototype.startServer = function () {
        this.app.listen(process.env.PORT, function () {
            console.log('server Running');
        });
    };
    App.prototype.databaseConnection = function () {
        var urlConnection = "mongodb+srv://" + process.env.DATABASE_USER + ":" + process.env.DATABASE_PASSWORD + "@cluster0.jrvof.mongodb.net/qacademicDB?retryWrites=true&w=majority";
        mongoose_1.default.connect(urlConnection, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err)
                throw err && '\n\n\n DATABASE NOT FOUND \n\n\n';
            console.log('connected with mongodb');
        });
    };
    return App;
}());
var startServer = function () { return new App().startServer(); };
startServer();
