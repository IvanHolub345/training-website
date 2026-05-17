import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { PolarBear } from '../src/models/polarBear';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про білих ведмедів
describe('API вебдодатку сайту про білих ведмедів', () => {
    // Отримуємо екземпляр бази даних з контейнера
    const database = container.get<IDatabase>(TYPES.IDatabase);
    // Створюємо спеціальний URI для тестової бази даних
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/polar-bears-test');

    // Перед запуском тестів підключаємось до тестової бази даних
    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    // Після всіх тестів очищуємо базу даних і відключаємося
    after(async () => {
        try {
            // Видаляємо тестову базу даних
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "polar-bears-test" успішно видалено');
        } catch (error) {
            // Обробляємо можливі помилки
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            // В будь-якому разі відключаємося від бази даних
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    // Тести для перевірки підключення до бази даних
    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    // Перед кожним тестом очищуємо колекцію білих ведмедів
    beforeEach(async () => {
        await PolarBear.deleteMany({});
    });

    // Тести для створення запису про нового білого ведмедя (POST-запит)
    describe('POST /api/polar-bears', () => {
        it('має створити запис про нового білого ведмедя', done => {
            // Тестові дані білого ведмедя
            const polarBear = {
                name: 'Вухань',
                age: 2,
                height: 30,
                weight: 2.5,
                eatenFish: 12,
                gender: 'male' as const,
                description: 'Сірий білий ведмідь',
            };

            // Виконуємо POST-запит для створення запису про білого ведмедя
            chai.request(app)
                .post('/api/polar-bears')
                .send(polarBear)
                .end((err, res) => {
                    if (err !== null && err !== undefined) {
                        return done(err);
                    }
                    // Перевіряємо відповідь
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', polarBear.name);
                    expect(res.body).to.have.property('age', polarBear.age);
                    expect(res.body).to.have.property('height', polarBear.height);
                    expect(res.body).to.have.property('weight', polarBear.weight);
                    expect(res.body).to.have.property('eatenFish', polarBear.eatenFish);
                    expect(res.body).to.have.property('gender', polarBear.gender);
                    expect(res.body).to.have.property('description', polarBear.description);
                    expect(res.body).to.have.property('dateAdded');
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    // Тести для отримання всіх записів білих ведмедів (GET-запит)
    describe('GET /api/polar-bears', () => {
        it('має отримати всіх білих ведмедів', async () => {
            // Створюємо тестовий запис білого ведмедя
            const testPolarBear = new PolarBear({
                name: 'Білан',
                age: 3,
                height: 35,
                weight: 3.2,
                eatenFish: 12,
                gender: 'male',
                description: 'Білий білий ведмідь',
            });
            await testPolarBear.save();

            // Виконуємо GET-запит для отримання всіх записів білих ведмедів
            const res = await chai.request(app).get('/api/polar-bears');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Білан');
            expect(res.body[0]).to.have.property('eatenFish', 12);
            expect(res.body[0]).to.have.property('gender', 'male');
            expect(res.body[0]).to.have.property('description', 'Білий білий ведмідь');
            expect(res.body[0]).to.have.property('dateAdded');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    // Тести для отримання запису конкретного білого ведмедя за ID (GET-запит)
    describe('GET /api/polar-bears/:id', () => {
        it('має отримати конкретного білого ведмедя за id', async () => {
            // Створюємо запис тестового білого ведмедя
            const testPolarBear = new PolarBear({
                name: 'Косий',
                age: 1,
                height: 25,
                weight: 1.8,
                eatenFish: 12,
                gender: 'male',
                description: 'Коричневий білий ведмідь',
            });
            const savedPolarBear = await testPolarBear.save();

            // Виконуємо GET-запит для отримання запису білого ведмедя за ID
            const res = await chai
                .request(app)
                .get(`/api/polar-bears/${String(savedPolarBear._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Косий');
            expect(res.body).to.have.property('age', 1);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('eatenFish', 12);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Коричневий білий ведмідь');
        });

        it('має повернути 404 для неіснуючого білого ведмедя', async () => {
            // Виконуємо GET-запит для неіснуючого ID білого ведмедя
            const res = await chai.request(app).get('/api/polar-bears/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    // Тести для повного оновлення запису про білого ведмедя (PUT-запит)
    describe('PUT /api/polar-bears/:id', () => {
        it('має повністю оновити запис про білого ведмедя', async () => {
            // Створюємо тестового білого ведмедя
            const testPolarBear = new PolarBear({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                eatenFish: 12,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedPolarBear = await testPolarBear.save();

            // Дані для оновлення білого ведмедя
            const updatedData = {
                name: 'Оновлений',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'female',
                description: 'Оновлений опис',
                eatenFish: 15,
            };

            // Виконуємо PUT-запит для повного оновлення запису про білого ведмедя
            const res = await chai
                .request(app)
                .put(`/api/polar-bears/${String(savedPolarBear._id)}`)
                .send(updatedData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('height', 30);
            expect(res.body).to.have.property('weight', 2.5);
            expect(res.body).to.have.property('eatenFish', 15);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            // Створюємо тестового білого ведмедя
            const testPolarBear = new PolarBear({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                eatenFish: 12,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedPolarBear = await testPolarBear.save();

            // Неповні дані для оновлення (відсутні обов'язкові поля)
            const incompleteData = {
                name: 'Оновлений',
                age: 2,
                // height і weight відсутні
                gender: 'female',
                description: 'Оновлений опис',
                eatenFish: 18,
            };

            // Виконуємо PUT-запит з неповними даними
            const res = await chai
                .request(app)
                .put(`/api/polar-bears/${String(savedPolarBear._id)}`)
                .send(incompleteData);

            // Перевіряємо, що запит завершився з помилкою
            expect(res).to.have.status(400);

            // Перевіряємо, що білий ведмідь не змінився
            const unchangedPolarBear = await PolarBear.findById(savedPolarBear._id);
            expect(unchangedPolarBear).to.have.property('name', 'Оригінальний');
            expect(unchangedPolarBear).to.have.property('height', 25);
            expect(unchangedPolarBear).to.have.property('weight', 1.8);
            expect(unchangedPolarBear).to.have.property('eatenFish', 12);
        });
    });

    // Тести для часткового оновлення запису про білого ведмедя (PATCH-запит)
    describe('PATCH /api/polar-bears/:id', () => {
        it('має частково оновити запис про білого ведмедя', async () => {
            // Створюємо тестового білого ведмедя
            const testPolarBear = new PolarBear({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                eatenFish: 12,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedPolarBear = await testPolarBear.save();

            // Дані для часткового оновлення
            const patchData = {
                name: 'Частково оновлений',
                age: 3,
                description: 'Оновлений опис',
                eatenFish: 20,
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/polar-bears/${String(savedPolarBear._id)}`)
                .send(patchData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 3);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('eatenFish', 20);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            // Створюємо тестового білого ведмедя
            const testPolarBear = new PolarBear({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                eatenFish: 12,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedPolarBear = await testPolarBear.save();

            // Ті самі неповні дані, що не спрацювали з PUT, мають працювати з PATCH
            const partialData = {
                name: 'Оновлений',
                age: 2,
                // height і weight навмисно відсутні
                gender: 'female',
                description: 'Оновлений опис',
                eatenFish: 22,
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/polar-bears/${String(savedPolarBear._id)}`)
                .send(partialData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            // Ці поля мають зберегти свої початкові значення
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('eatenFish', 22);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
        });
    });

    // Тести для отримання метаданих (HEAD-запит)
    describe('HEAD /api/polar-bears', () => {
        it('має повернути заголовки метаданих', async () => {
            // Виконуємо HEAD-запит
            const res = await chai
                .request(app)
                .head('/api/polar-bears')
                .set('Accept', 'application/json');

            // Перевіряємо статус відповіді
            expect(res).to.have.status(200);

            // Виводимо отримані заголовки
            console.log('Заголовки:');
            console.log('-----------------');
            Object.entries(res.headers).forEach(([key, value]) => {
                console.log(`${key}: ${String(value)}`);
            });

            // Перевіряємо наявність необхідних заголовків
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    // Тести для видалення запису білого ведмедя (DELETE-запит)
    describe('DELETE /api/polar-bears/:id', () => {
        it('має видалити запис про білого ведмедя', async () => {
            // Створюємо тестового білого ведмедя
            const testPolarBear = new PolarBear({
                name: 'Стрибунець',
                age: 2,
                height: 28,
                weight: 2.1,
                eatenFish: 12,
                gender: 'female',
                description: 'Чорний білий ведмідь',
            });
            const savedPolarBear = await testPolarBear.save();

            // Виконуємо DELETE-запит
            const res = await chai
                .request(app)
                .delete(`/api/polar-bears/${String(savedPolarBear._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про білого ведмедя видалено');

            // Перевіряємо, що запис про білого ведмедя дійсно видалено з бази
            const findPolarBear = await PolarBear.findById(savedPolarBear._id);
            expect(findPolarBear).to.be.null;
        });
    });
});
