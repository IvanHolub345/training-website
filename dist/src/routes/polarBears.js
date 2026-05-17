"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../config/container");
const PolarBearRepository_1 = require("../repositories/PolarBearRepository");
// Створюємо новий обробник HTTP-запитів Express
const router = (0, express_1.Router)();
// Отримуємо екземпляр репозиторію білих ведмедів з контейнера інверсії залежностей
const polarBearRepository = container_1.container.get(PolarBearRepository_1.PolarBearRepository);
// Обробка HTTP-запиту OPTIONS / - список дозволених методів
router.options('/', (_req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send();
});
// Обробка HTTP-запиту GET / - отримання всіх записів білих ведмедів
router.get('/', (async (_req, res) => {
    try {
        // Отримуємо всі записи білих ведмедів з бази даних через репозиторій
        const polarBears = await polarBearRepository.findAll();
        res.json(polarBears);
    }
    catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}));
// Обробка HTTP-запиту GET /:id - отримання запису одного білого ведмедя за ідентифікатором
router.get('/:id', (async (req, res) => {
    try {
        // Пошук білого ведмедя за ідентифікатором
        const polarBear = await polarBearRepository.findById(req.params.id);
        if (polarBear) {
            res.json(polarBear);
        }
        else {
            // Якщо білий ведмідь не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис білого ведмедя не знайдено' });
        }
    }
    catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}));
// Обробка HTTP-запиту POST / - створення нового запису білого ведмедя
router.post('/', (async (req, res) => {
    try {
        // Створюємо новий запис білого ведмедя з даних запиту
        const newPolarBear = await polarBearRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного білого ведмедя
        res.status(201).json(newPolarBear);
    }
    catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}));
// Обробка HTTP-запиту PUT /:id - повне оновлення запису білого ведмедя
router.put('/:id', (async (req, res) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender', 'eatenFish'];
        const missingFields = requiredFields.filter(field => !(field in req.body));
        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }
        // Оновлюємо білого ведмедя з вказаним ID
        const polarBear = await polarBearRepository.update(req.params.id, req.body);
        if (polarBear) {
            return res.json(polarBear);
        }
        else {
            // Якщо білий ведмідь не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис білого ведмедя не знайдено' });
        }
    }
    catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}));
// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису білого ведмедя
router.patch('/:id', (async (req, res) => {
    try {
        // Часткове оновлення запису білого ведмедя - передаються лише ті поля, які потрібно змінити
        const polarBear = await polarBearRepository.patch(req.params.id, req.body);
        if (polarBear) {
            res.json(polarBear);
        }
        else {
            // Якщо білий ведмідь не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис білого ведмедя не знайдено' });
        }
    }
    catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}));
// Обробка HTTP-запиту DELETE /:id - видалення запису білого ведмедя
router.delete('/:id', (async (req, res) => {
    try {
        // Видаляємо дані про білого ведмедя за ID
        const polarBear = await polarBearRepository.delete(req.params.id);
        if (polarBear) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про білого ведмедя видалено' });
        }
        else {
            // Якщо білий ведмідь не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про білого ведмедя не знайдено' });
        }
    }
    catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}));
exports.default = router;
//# sourceMappingURL=polarBears.js.map