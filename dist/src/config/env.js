"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Завантажуємо змінні середовища
dotenv_1.default.config();
// Функція для отримання значення змінної середовища з можливістю встановлення значення за замовчуванням
const getEnvValue = (key, defaultValue) => {
    const value = process.env[key];
    // Виводимо попередження, якщо змінна не встановлена в production середовищі
    if (value === undefined && process.env.NODE_ENV === 'production') {
        console.warn(`Попередження: змінна середовища ${key} не встановлена, використовуємо значення за замовчуванням`);
    }
    return value !== undefined ? value : defaultValue;
};
// Експортуємо змінні середовища з типізацією та значеннями за замовчуванням
exports.NODE_ENV = getEnvValue('NODE_ENV', 'development');
exports.PORT = parseInt(getEnvValue('PORT', '5000'), 10);
exports.MONGODB_URI = getEnvValue('MONGODB_URI', 'mongodb://localhost:27017/polar_bears');
//# sourceMappingURL=env.js.map