"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var StudentController_1 = __importDefault(require("./controllers/StudentController"));
var router = express_1.Router();
/* router.get('/students', studentController.index);
router.post('/students', studentController.store);
router.delete('/students/:id', studentController.destroy);
router.get('/students/:id', studentController.show);
 */
router.post('/students', StudentController_1.default.getGradesByLoggin);
exports.default = router;
