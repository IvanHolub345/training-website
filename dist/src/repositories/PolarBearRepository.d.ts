import { IPolarBear } from '../models/polarBear';
export declare class PolarBearRepository {
    findAll(): Promise<IPolarBear[]>;
    findById(id: string): Promise<IPolarBear | null>;
    create(polarBearData: IPolarBear): Promise<IPolarBear>;
    delete(id: string): Promise<boolean>;
    update(id: string, polarBearData: IPolarBear): Promise<IPolarBear | null>;
    patch(id: string, polarBearData: Partial<IPolarBear>): Promise<IPolarBear | null>;
}
