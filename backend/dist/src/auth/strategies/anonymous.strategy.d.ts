import { Strategy } from 'passport-anonymous';
declare const AnonymousStrategy_base: new () => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class AnonymousStrategy extends AnonymousStrategy_base {
    constructor();
    validate(payload: unknown, request: unknown): unknown;
}
export {};
