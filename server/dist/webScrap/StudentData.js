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
var puppeteer_1 = __importDefault(require("puppeteer"));
var StudentData = /** @class */ (function () {
    function StudentData() {
    }
    StudentData.prototype.start = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, wrongUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: true, ignoreHTTPSErrors: true })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.pages()];
                    case 2:
                        page = (_a.sent())[0];
                        return [4 /*yield*/, this.openStudentLogginBrowser(page)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loginForm(page, login, password)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () { var _a; return (_a = document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > strong > font')) === null || _a === void 0 ? void 0 : _a.innerHTML; })];
                    case 5:
                        wrongUser = _a.sent();
                        console.log(wrongUser);
                        if (wrongUser != null) {
                            // wrong login
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.openStudentGradesBrowser(page)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.getUserData(page)];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StudentData.prototype.openStudentLogginBrowser = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.goto('https://academico.ifmt.edu.br/qacademico/alunos')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentData.prototype.loginForm = function (page, login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var loginSelector, passwordSelector, okSelector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginSelector = '#txtLogin';
                        passwordSelector = '#txtSenha';
                        okSelector = '#btnOk';
                        return [4 /*yield*/, page.click(loginSelector)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.keyboard.type(login)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.click(passwordSelector)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.keyboard.type(password)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.click(okSelector)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, page.waitForNavigation()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentData.prototype.openStudentGradesBrowser = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.goto('https://academico.ifmt.edu.br/qacademico/alunos/boletim/index.asp')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentData.prototype.getUserData = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, years, _loop_1, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {};
                        return [4 /*yield*/, page.$$eval('#cmbanos > option', function (options) { return options.map(function (option) { return option.textContent; }); })];
                    case 1:
                        years = _a.sent();
                        _loop_1 = function (index) {
                            var year, pageURL, tableData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        year = years[index];
                                        userData["" + year] = {};
                                        pageURL = "https://academico.ifmt.edu.br/qacademico/index.asp?t=2032&COD_MATRICULA=-1&cmbanos=" + year + "&cmbperiodos=1&Exibir=Exibir+Boletim";
                                        return [4 /*yield*/, page.goto(pageURL, { waitUntil: 'domcontentloaded' })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, page.evaluate(function () {
                                                var rows = Array.from(document.querySelectorAll('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(7) > tbody > tr'));
                                                rows.shift();
                                                rows.shift();
                                                return rows.map(function (row) {
                                                    var columns = row.querySelectorAll('td');
                                                    return Array.from(columns, function (column) { var _a; return (_a = column) === null || _a === void 0 ? void 0 : _a.innerText; });
                                                });
                                            })];
                                    case 2:
                                        tableData = _a.sent();
                                        tableData.map(function (rows) {
                                            var className = rows[0];
                                            var classNameTreated = className.slice(0, className.indexOf('-'));
                                            var grade1B = parseFloat(rows[5].replace(',', '.'));
                                            var missedClasses1B = parseFloat(rows[6].replace(',', '.'));
                                            var concept1b = parseFloat(rows[7].replace(',', '.'));
                                            var grade2B = parseFloat(rows[10].replace(',', '.'));
                                            var missedClasses2B = parseFloat(rows[11].replace(',', '.'));
                                            var concept2b = parseFloat(rows[12].replace(',', '.'));
                                            var grade3B = parseFloat(rows[15].replace(',', '.'));
                                            var missedClasses3B = parseFloat(rows[16].replace(',', '.'));
                                            var concept3b = parseFloat(rows[17].replace(',', '.'));
                                            var grade4B = parseFloat(rows[20].replace(',', '.'));
                                            var missedClasses4B = parseFloat(rows[21].replace(',', '.'));
                                            var concept4b = parseFloat(rows[22].replace(',', '.'));
                                            userData["" + year]["" + classNameTreated] = [
                                                { concept: concept1b, missedClasses: missedClasses1B, grade: grade1B },
                                                { concept: concept2b, missedClasses: missedClasses2B, grade: grade2B },
                                                { concept: concept3b, missedClasses: missedClasses3B, grade: grade3B },
                                                { concept: concept4b, missedClasses: missedClasses4B, grade: grade4B }
                                            ];
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < years.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(index)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, userData];
                }
            });
        });
    };
    return StudentData;
}());
exports.default = StudentData;
/*
{
"2020":[

    matematica:{},

    matematica:{},

],
"2021":[]
}

*/
