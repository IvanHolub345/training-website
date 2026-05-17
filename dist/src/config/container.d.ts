import 'reflect-metadata';
import { Container } from 'inversify';
export interface IConfig {
    nodeEnv: string;
}
declare const container: Container;
export { container };
