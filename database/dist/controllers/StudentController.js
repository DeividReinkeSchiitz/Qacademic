"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../webScrap/index"));
var puppeteer_cluster_1 = require("puppeteer-cluster");
var puppeteerOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--no-zygote'
    ]
};
var StudentController = /** @class */ (function () {
    function StudentController() {
        this.cluster = puppeteer_cluster_1.Cluster.launch({
            concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 10,
            puppeteerOptions: puppeteerOptions,
            monitor: false
        });
        this.listenErrors();
        this.createTask();
    }
    StudentController.prototype.listenErrors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cluster];
                    case 1:
                        (_a.sent()).on('taskerror', function (err, data) {
                            console.log("Error crawling " + data + ": " + err.message);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentController.prototype.createTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cluster];
                    case 1: return [4 /*yield*/, (_a.sent()).task(function (_a) {
                            var page = _a.page, _b = _a.data, password = _b.password, login = _b.login;
                            return __awaiter(_this, void 0, void 0, function () {
                                var student;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            student = new index_1.default(page);
                                            return [4 /*yield*/, student.login(login, password)];
                                        case 1:
                                            _c.sent();
                                            return [4 /*yield*/, student.data()];
                                        case 2: return [2 /*return*/, _c.sent()];
                                    }
                                });
                            });
                        })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentController.prototype.getData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, login, data, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        _a = req.body, password = _a.password, login = _a.login;
                        return [4 /*yield*/, this.cluster];
                    case 1: return [4 /*yield*/, (_b.sent()).execute({ password: password, login: login })];
                    case 2:
                        data = _b.sent();
                        res.json(data);
                        return [4 /*yield*/, this.cluster];
                    case 3: return [4 /*yield*/, (_b.sent()).idle()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3 /*break*/, 7];
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return StudentController;
}());
var studentControllers = new StudentController();
exports.default = studentControllers;
