"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StudentSchema = new mongoose_1.Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    grades: { type: Object, required: false },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Student', StudentSchema);
