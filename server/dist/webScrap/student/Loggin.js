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
Object.defineProperty(exports, "__esModule", { value: true });
var StudentLoggin = /** @class */ (function () {
    function StudentLoggin(login, password, page) {
        this.login = login;
        this.password = password;
        this.page = page;
    }
    StudentLoggin.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.openStudentLogginBrowser()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loginForm()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.wrongLogin()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    StudentLoggin.prototype.openStudentLogginBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('https://academico.ifmt.edu.br/qacademico/alunos')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentLoggin.prototype.loginForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginSelector, passwordSelector, okSelector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginSelector = '#txtLogin';
                        passwordSelector = '#txtSenha';
                        okSelector = '#btnOk';
                        return [4 /*yield*/, this.page.click(loginSelector)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.type(this.login)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.click(passwordSelector)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.page.keyboard.type(this.password)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.page.click(okSelector)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForNavigation()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentLoggin.prototype.wrongLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wrongUser, userCorrect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { var _a; return (_a = document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > strong > font')) === null || _a === void 0 ? void 0 : _a.innerHTML; })];
                    case 1:
                        wrongUser = _a.sent();
                        userCorrect = false;
                        if (wrongUser == null) {
                            userCorrect = true;
                        }
                        else {
                            userCorrect = false;
                        }
                        return [2 /*return*/, userCorrect];
                }
            });
        });
    };
    return StudentLoggin;
}());
exports.default = StudentLoggin;
