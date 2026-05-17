import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Білий ведмідь"
interface IPolarBear {
    name: string; // Ім'я білого ведмедя
    age: number; // Вік білого ведмедя у роках
    height: number; // Висота білого ведмедя в сантиметрах
    weight: number; // Вага білого ведмедя в кілограмах
    gender: 'male' | 'female'; // Стать білого ведмедя: 'male' - самець, 'female' - самка
    description?: string; // Опис білого ведмедя (необов'язкове поле)
    eatenFish: number; // Кількість з'їденої риби за день, кг
    image?: string; // Назва фото білого ведмедя (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Білий ведмідь"
const polarBearSchema = new Schema<IPolarBear>({
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
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    eatenFish: {
        type: Number,
        required: true, // Обов'язкове поле за варіантом: кількість з'їденої риби за день, кг
        min: 0,
    },
    image: String, // Необов'язкова назва фото
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});

// Створення моделі Mongoose на основі схеми
export const PolarBear = model<IPolarBear>('PolarBear', polarBearSchema);
export type { IPolarBear }; // Експортуємо інтерфейс для використання в інших файлах
