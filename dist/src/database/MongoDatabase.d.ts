import { IDatabase } from '../interfaces/IDatabase';
import type { IConfig } from '../config/container';
export declare class MongoDatabase implements IDatabase {
    private config;
    private _isConnected;
    private _connectionUri;
    constructor(config: IConfig);
    connect(uri?: string): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
    getConnectionUri(): string | null;
}
