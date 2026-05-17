"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const MongoDatabase_1 = require("../database/MongoDatabase");
const PolarBearRepository_1 = require("../repositories/PolarBearRepository");
const types_1 = require("../types/types");
const env_1 = require("./env");
// Створюємо контейнер інверсії залежностей (IoC)
const container = new inversify_1.Container();
exports.container = container;
// Зв'язуємо об'єкт конфігурації як константне значення
container.bind('Config').toConstantValue({
    nodeEnv: env_1.NODE_ENV,
});
// Зв'язуємо інтерфейс бази даних з його реалізацією як одиночний екземпляр (singleton)
container.bind(types_1.TYPES.IDatabase).to(MongoDatabase_1.MongoDatabase).inSingletonScope();
// Пряме зв'язування конкретного класу PolarBearRepository як одиночного екземпляру
container.bind(PolarBearRepository_1.PolarBearRepository).toSelf().inSingletonScope();
//# sourceMappingURL=container.js.map