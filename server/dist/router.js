"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var StudentController_1 = __importDefault(require("./controllers/StudentController"));
var router = express_1.Router();
router.post('/students', function (req, res) { return StudentController_1.default.getData(req, res); });
exports.default = router;
