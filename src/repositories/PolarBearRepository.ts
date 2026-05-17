import { injectable } from 'inversify';
import { PolarBear, IPolarBear } from '../models/polarBear';

// Клас-репозиторій для роботи з білого ведмедями
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class PolarBearRepository {
    // Метод для отримання всіх білих ведмедів з бази даних
    public async findAll(): Promise<IPolarBear[]> {
        return PolarBear.find();
    }

    // Метод для пошуку білого ведмедя за унікальним ідентифікатором
    public async findById(id: string): Promise<IPolarBear | null> {
        return PolarBear.findById(id);
    }

    // Метод для створення нового білого ведмедя в базі даних
    public async create(polarBearData: IPolarBear): Promise<IPolarBear> {
        const polarBear = new PolarBear(polarBearData);
        return polarBear.save();
    }

    // Метод для видалення білого ведмедя за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await PolarBear.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про білого ведмедя (заміна всіх полів)
    public async update(id: string, polarBearData: IPolarBear): Promise<IPolarBear | null> {
        return PolarBear.findByIdAndUpdate(id, polarBearData, { new: true });
    }

    // Метод для часткового оновлення даних про білого ведмедя (оновлення лише вказаних полів)
    public async patch(id: string, polarBearData: Partial<IPolarBear>): Promise<IPolarBear | null> {
        return PolarBear.findByIdAndUpdate(id, { $set: polarBearData }, { new: true });
    }
}
