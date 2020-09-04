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
var ClassMaterial = /** @class */ (function () {
    function ClassMaterial(page) {
        this.page = page;
    }
    ClassMaterial.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.openClassMaterialBrowser()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getUserData()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClassMaterial.prototype.openClassMaterialBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://academico.ifmt.edu.br/qacademico/index.asp?t=2061';
                        return [4 /*yield*/, this.page.goto(url, { waitUntil: 'domcontentloaded' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassMaterial.prototype.getYearsOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var optionsElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optionsElement = '#ANO_PERIODO > option';
                        return [4 /*yield*/, this.page.waitForSelector(optionsElement)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.$$eval(optionsElement, function (options) { return options.map(function (option) { return option.textContent; }); })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClassMaterial.prototype.createTwoDimensionalArrayFromTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tableElement, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr';
                        return [4 /*yield*/, this.page.waitForSelector(tableElement)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.evaluate(function () {
                                var tableElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr';
                                var rows = Array.from(document.querySelectorAll(tableElement));
                                // remove unecessary row
                                rows.shift();
                                return rows.map(function (row) {
                                    var columns = row.querySelectorAll('td');
                                    return Array.from(columns, function (column) { var _a; return (_a = column) === null || _a === void 0 ? void 0 : _a.innerText; });
                                });
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ClassMaterial.prototype.getUserData = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var classMaterials, years, index, year, yearTreated, tableData, classNameTreated, indexRow, row, className, newYear, publicationData, obs, material, newYear;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        classMaterials = {};
                        return [4 /*yield*/, this.getYearsOptions()];
                    case 1:
                        years = _e.sent();
                        // remove the first year if it doesnt have nothing
                        if (years[0] === '') {
                            years.shift();
                        }
                        index = 0;
                        _e.label = 2;
                    case 2:
                        if (!(index < years.length)) return [3 /*break*/, 11];
                        year = years[index];
                        yearTreated = (_a = year) === null || _a === void 0 ? void 0 : _a.replace(/ /ig, '');
                        classMaterials["" + yearTreated] = {};
                        yearTreated = (_b = yearTreated) === null || _b === void 0 ? void 0 : _b.replace('/', '_');
                        if (!(index !== 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.navigate(yearTreated)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4: return [4 /*yield*/, this.createTwoDimensionalArrayFromTable()];
                    case 5:
                        tableData = _e.sent();
                        classNameTreated = '';
                        indexRow = 0;
                        _e.label = 6;
                    case 6:
                        if (!(indexRow < tableData.length)) return [3 /*break*/, 10];
                        row = tableData[indexRow];
                        if (!(row[0].length === 1)) return [3 /*break*/, 7];
                        className = row[1];
                        classNameTreated = this.treatingClassName(className);
                        newYear = (_c = yearTreated) === null || _c === void 0 ? void 0 : _c.replace('_', '/');
                        classMaterials["" + newYear]["" + classNameTreated] = [];
                        return [3 /*break*/, 9];
                    case 7:
                        publicationData = row[0];
                        obs = row[1].slice(row[1].indexOf('Observações:'), row[1].indexOf('</tr>')).replace('Observações: ', '') || '';
                        return [4 /*yield*/, this.page.evaluate(function (indexRow) {
                                var _a;
                                var a = document.querySelector("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(" + (indexRow + 2) + ") > td:nth-child(2) > a");
                                return (_a = a) === null || _a === void 0 ? void 0 : _a.href;
                            }, indexRow)];
                    case 8:
                        material = _e.sent();
                        newYear = (_d = yearTreated) === null || _d === void 0 ? void 0 : _d.replace('_', '/');
                        classMaterials["" + newYear]["" + classNameTreated].push({
                            publicationData: publicationData,
                            material: material || '',
                            obs: obs
                        });
                        _e.label = 9;
                    case 9:
                        indexRow++;
                        return [3 /*break*/, 6];
                    case 10:
                        index++;
                        return [3 /*break*/, 2];
                    case 11: return [2 /*return*/, classMaterials];
                }
            });
        });
    };
    ClassMaterial.prototype.navigate = function (year) {
        return __awaiter(this, void 0, void 0, function () {
            var selectElement, buttonElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectElement = 'select[name="ANO_PERIODO"]';
                        buttonElement = 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(3) > form > input';
                        return [4 /*yield*/, this.page.waitForSelector(selectElement)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForSelector(buttonElement)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.select(selectElement, year || '')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.page.click(buttonElement)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForNavigation()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassMaterial.prototype.treatingClassName = function (className) {
        var firstCaracter = className.indexOf('-');
        var secondCaracter = className.indexOf('-', firstCaracter + 1);
        var thirtyCaracter = className.indexOf('-', secondCaracter + 1);
        var classNameTreated = className.slice(secondCaracter, thirtyCaracter);
        classNameTreated = classNameTreated.replace(/-/gi, '');
        classNameTreated = classNameTreated.trim();
        return classNameTreated;
    };
    return ClassMaterial;
}());
exports.default = ClassMaterial;
