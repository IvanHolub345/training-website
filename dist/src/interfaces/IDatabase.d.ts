export interface IDatabase {
    connect(uri?: string): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
    getConnectionUri(): string | null;
}
