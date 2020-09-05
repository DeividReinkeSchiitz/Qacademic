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
var StudentData = /** @class */ (function () {
    function StudentData(page) {
        this.page = page;
        this.years = [];
    }
    StudentData.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.openStudentGradesBrowser()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getYearsOptions()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getUserData()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error('ERROR IN GRADES PAGE' + error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    StudentData.prototype.openStudentGradesBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('https://academico.ifmt.edu.br/qacademico/alunos/boletim/index.asp')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentData.prototype.getYearsOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.page.$$eval('#cmbanos > option', function (options) { return options.map(function (option) { return option.textContent; }); })];
                    case 1:
                        _a.years = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StudentData.prototype.createTwoDimensionalArrayFromTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () {
                            var rows = Array.from(document.querySelectorAll('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(7) > tbody > tr'));
                            rows.shift();
                            rows.shift();
                            return rows.map(function (row) {
                                var columns = row.querySelectorAll('td');
                                return Array.from(columns, function (column) { var _a; return (_a = column) === null || _a === void 0 ? void 0 : _a.innerText; });
                            });
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    StudentData.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userData, _loop_1, this_1, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {};
                        _loop_1 = function (index) {
                            var year, pageURL, tableData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        year = this_1.years[index];
                                        userData["" + year] = {};
                                        pageURL = "https://academico.ifmt.edu.br/qacademico/index.asp?t=2032&COD_MATRICULA=-1&cmbanos=" + year + "&cmbperiodos=1&Exibir=Exibir+Boletim";
                                        return [4 /*yield*/, this_1.page.goto(pageURL, { waitUntil: 'domcontentloaded' })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this_1.createTwoDimensionalArrayFromTable()];
                                    case 2:
                                        tableData = _a.sent();
                                        // GET SPECIFIC DATA FROM TABLE
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
                        this_1 = this;
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < this.years.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(index)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, userData];
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
