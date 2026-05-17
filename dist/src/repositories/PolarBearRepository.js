"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarBearRepository = void 0;
const inversify_1 = require("inversify");
const polarBear_1 = require("../models/polarBear");
// Клас-репозиторій для роботи з білого ведмедями
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
let PolarBearRepository = class PolarBearRepository {
    // Метод для отримання всіх білих ведмедів з бази даних
    async findAll() {
        return polarBear_1.PolarBear.find();
    }
    // Метод для пошуку білого ведмедя за унікальним ідентифікатором
    async findById(id) {
        return polarBear_1.PolarBear.findById(id);
    }
    // Метод для створення нового білого ведмедя в базі даних
    async create(polarBearData) {
        const polarBear = new polarBear_1.PolarBear(polarBearData);
        return polarBear.save();
    }
    // Метод для видалення білого ведмедя за ідентифікатором
    async delete(id) {
        const result = await polarBear_1.PolarBear.findByIdAndDelete(id);
        return result !== null;
    }
    // Метод для повного оновлення даних про білого ведмедя (заміна всіх полів)
    async update(id, polarBearData) {
        return polarBear_1.PolarBear.findByIdAndUpdate(id, polarBearData, { new: true });
    }
    // Метод для часткового оновлення даних про білого ведмедя (оновлення лише вказаних полів)
    async patch(id, polarBearData) {
        return polarBear_1.PolarBear.findByIdAndUpdate(id, { $set: polarBearData }, { new: true });
    }
};
PolarBearRepository = __decorate([
    (0, inversify_1.injectable)()
], PolarBearRepository);
exports.PolarBearRepository = PolarBearRepository;
//# sourceMappingURL=PolarBearRepository.js.map