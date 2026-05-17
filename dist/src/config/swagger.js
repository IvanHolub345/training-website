"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
// Експорт специфікації Swagger/OpenAPI для документації про API
exports.swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Білих ведмедів',
        version: '1.0.0',
        description: 'Документація API для Сайту про Білих ведмедів',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url: process.env.CODESPACE_NAME !== undefined
                ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/polar-bears': {
            // GET запит для отримання всіх білих ведмедів
            get: {
                summary: 'Отримати всіх білих ведмедів',
                responses: {
                    '200': {
                        description: 'Список всіх білих ведмедів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/PolarBear' },
                                },
                            },
                        },
                    },
                },
            },
            // POST запит для створення нового білого ведмедя
            post: {
                summary: 'Створити нового білого ведмедя',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PolarBear' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт білого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/PolarBear' },
                            },
                        },
                    },
                },
            },
        },
        // Операції для конкретного білого ведмедя за ID
        '/api/polar-bears/{id}': {
            // GET запит для отримання білого ведмедя за ID
            get: {
                summary: 'Отримати білого ведмедя за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID білого ведмедя',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт білого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/PolarBear' },
                            },
                        },
                    },
                    '404': { description: 'Білого ведмедя не знайдено' },
                },
            },
            // PUT запит для повного оновлення білого ведмедя за ID
            put: {
                summary: 'Повністю оновити білого ведмедя',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID білого ведмедя',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PolarBear' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт білого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/PolarBear' },
                            },
                        },
                    },
                    '404': { description: 'Білого ведмедя не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення білого ведмедя за ID
            patch: {
                summary: 'Частково оновити білого ведмедя',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID білого ведмедя',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PolarBear' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт білого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/PolarBear' },
                            },
                        },
                    },
                    '404': { description: 'Білого ведмедя не знайдено' },
                },
            },
            // DELETE запит для видалення даних про білого ведмедя за ID
            delete: {
                summary: 'Видалити дані про білого ведмедя',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID білого ведмедя',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Білого ведмедя не знайдено' },
                },
            },
        },
    },
    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Білий ведмідь
            PolarBear: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender', 'eatenFish'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я білого ведмедя",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік білого ведмедя у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота білого ведмедя в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага білого ведмедя в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать білого ведмедя',
                    },
                    eatenFish: {
                        type: 'number',
                        description: "Кількість з'їденої риби за день, кг",
                        example: 12,
                    },
                    image: {
                        type: 'string',
                        description: 'Назва файлу фото білого ведмедя',
                        example: 'wildest-arctic.webp',
                    },
                    description: {
                        type: 'string',
                        description: "Опис білого ведмедя (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=swagger.js.map