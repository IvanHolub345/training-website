"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const container_1 = require("./config/container");
const types_1 = require("./types/types");
const config = __importStar(require("./config/env"));
const swagger_1 = require("./config/swagger");
// Створюємо екземпляр Express-додатку
const app = (0, express_1.default)();
// Підключаємо проміжне програмне забезпечення (middleware)
app.use((0, cors_1.default)()); // Дозволяє крос-доменні запити
app.use(body_parser_1.default.json()); // Парсинг JSON в тілі запиту
app.use('/images', express_1.default.static('public/images')); // Доступ до фотографій білих ведмедів
// Налаштування документації Swagger
// Надаємо доступ до JSON-специфікації REST API
app.get('/api-spec.json', (_req, res) => {
    res.json(swagger_1.swaggerSpec);
});
// Налаштовуємо інтерфейс Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Отримуємо екземпляр бази даних з IoC контейнера за допомогою бібліотеки Inversify
const database = container_1.container.get(types_1.TYPES.IDatabase);
const appConfig = container_1.container.get('Config');
// Підключаємо обробники HTTP-запитів до REST API
const polarBears_1 = __importDefault(require("./routes/polarBears"));
app.use('/api/polar-bears', polarBears_1.default);
// Отримуємо порт з конфігурації
const PORT = config.PORT;
// Запускаємо сервер лише якщо файл запущено напряму, а не як модуль
if (require.main === module) {
    // Підключаємося до бази даних перед запуском сервера
    database
        .connect()
        .then(() => {
        // Запускаємо HTTP-сервер
        app.listen(PORT, () => {
            console.log(`Сервер запущено на порту ${PORT} у режимі ${appConfig.nodeEnv}`);
            // Створюємо базову URL-адресу залежно від середовища
            const baseUrl = process.env.CODESPACE_NAME !== undefined
                ? `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
                : `http://localhost:${PORT}`;
            console.log(`Документація API доступна за адресою ${baseUrl}/api-docs`);
            console.log(`Специфікація доступна в Swagger UI за адресою ${baseUrl}/api-spec.json`);
        });
    })
        .catch(err => {
        // Обробка помилок підключення до бази даних
        console.error('Не вдалося підключитися до бази даних:', err);
        process.exit(1);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map