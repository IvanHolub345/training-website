"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarBear = void 0;
const mongoose_1 = require("mongoose");
// Схема MongoDB для моделі "Білий ведмідь"
const polarBearSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String,
    eatenFish: {
        type: Number,
        required: true,
        min: 0,
    },
    image: String,
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});
// Створення моделі Mongoose на основі схеми
exports.PolarBear = (0, mongoose_1.model)('PolarBear', polarBearSchema);
//# sourceMappingURL=polarBear.js.map