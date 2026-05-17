"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabase = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
// Клас для роботи з базою даних MongoDB
// Позначений як injectable для використання в IoC контейнері
let MongoDatabase = class MongoDatabase {
    // Конструктор з впровадженням залежності конфігурації
    constructor(config) {
        this.config = config;
        this._isConnected = false; // стан підключення
        this._connectionUri = null; // URI-адреса поточного підключення
        mongoose_1.default.set('strictQuery', true);
    }
    // Метод для підключення до бази даних
    async connect(uri) {
        // Використовуємо URI з параметра або з конфігурації
        const mongoUri = uri !== undefined ? uri : env_1.MONGODB_URI;
        // Перевіряємо, чи задано URI
        if (mongoUri === '') {
            throw new Error('URI MongoDB не визначено');
        }
        // Якщо вже підключені до цієї ж бази, повторно не підключаємося
        if (this._isConnected && this._connectionUri === mongoUri) {
            console.log('Використовуємо існуюче підключення до бази даних');
            return;
        }
        // Якщо підключені до іншої бази, спочатку відключаємося
        if (this._isConnected && this._connectionUri !== mongoUri) {
            console.log('Відключаємося від попередньої бази даних перед підключенням до нової');
            await this.disconnect();
        }
        try {
            // Створюємо підключення до MongoDB
            await mongoose_1.default.connect(mongoUri);
            this._isConnected = true;
            this._connectionUri = mongoUri;
            console.log(`MongoDB підключено: ${mongoose_1.default.connection.host} у режимі ${this.config.nodeEnv}`);
        }
        catch (error) {
            // Обробка помилок підключення
            const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
            console.error(`Помилка: ${errorMessage}`);
            throw error;
        }
    }
    // Метод для відключення від бази даних
    async disconnect() {
        // Якщо не підключені, нічого не робимо
        if (!this._isConnected) {
            return;
        }
        try {
            // Відключаємося від MongoDB
            await mongoose_1.default.disconnect();
            this._isConnected = false;
            this._connectionUri = null;
            console.log('MongoDB відключено');
        }
        catch (error) {
            // Обробка помилок відключення
            const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
            console.error(`Помилка відключення від MongoDB: ${errorMessage}`);
            throw error;
        }
    }
    // Метод для перевірки стану підключення
    isConnected() {
        return this._isConnected;
    }
    // Метод для отримання URI поточного підключення
    getConnectionUri() {
        return this._connectionUri;
    }
};
MongoDatabase = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Config')),
    __metadata("design:paramtypes", [Object])
], MongoDatabase);
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=MongoDatabase.js.map