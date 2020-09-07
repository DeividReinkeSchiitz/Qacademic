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
var Loggin_1 = __importDefault(require("./student/Loggin"));
var Grades_1 = __importDefault(require("./student/Grades"));
var ClassMaterial_1 = __importDefault(require("./student/ClassMaterial"));
var Home_1 = __importDefault(require("./student/Home"));
var Student = /** @class */ (function () {
    function Student(page) {
        this.page = page;
        this.pageInterceptor();
    }
    Student.prototype.pageInterceptor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // turns request interceptor on
                this.page.setRequestInterception(true);
                // if the page makes a  request to a resource type of image or stylesheet then abort that            request
                this.page.on('request', function (request) {
                    if (request.resourceType() === 'image' ||
                        request.resourceType() === 'stylesheet') {
                        request.abort();
                    }
                    else {
                        request.continue();
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    Student.prototype.login = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var userLogin;
            return __generator(this, function (_a) {
                userLogin = new Loggin_1.default(login, password, this.page);
                return [2 /*return*/, userLogin.start()];
            });
        });
    };
    Student.prototype.grades = function () {
        return __awaiter(this, void 0, void 0, function () {
            var studentGrades;
            return __generator(this, function (_a) {
                studentGrades = new Grades_1.default(this.page);
                return [2 /*return*/, studentGrades.start()];
            });
        });
    };
    Student.prototype.home = function () {
        return __awaiter(this, void 0, void 0, function () {
            function name() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, studentHome.getName()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            }
            var studentHome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        studentHome = new Home_1.default(this.page);
                        return [4 /*yield*/, studentHome.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { name: name }];
                }
            });
        });
    };
    Student.prototype.classMaterial = function () {
        return __awaiter(this, void 0, void 0, function () {
            var studentClassMaterial;
            return __generator(this, function (_a) {
                studentClassMaterial = new ClassMaterial_1.default(this.page);
                return [2 /*return*/, studentClassMaterial.start()];
            });
        });
    };
    Student.prototype.data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var grades, classMaterial, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.grades()];
                    case 1:
                        grades = _a.sent();
                        return [4 /*yield*/, this.classMaterial()];
                    case 2:
                        classMaterial = _a.sent();
                        return [4 /*yield*/, this.home()];
                    case 3: return [4 /*yield*/, (_a.sent()).name()];
                    case 4:
                        name = _a.sent();
                        return [2 /*return*/, {
                                name: name,
                                classMaterial: classMaterial,
                                grades: grades
                            }];
                }
            });
        });
    };
    return Student;
}());
// only for tests
/* const browser = puppeteer.launch({ headless: false, ignoreHTTPSErrors: true, args: ['--no-sandbox'] });

async function devTest (login:string, password:string) {
  const student = new Student((await browser));

  const response = await student.login(login, password).then(() => student.data()).catch(e => e);

  console.log(response);
}
 */
exports.default = Student;
