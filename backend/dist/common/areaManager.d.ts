export declare class AreaManager {
    private static areas;
    static registerToArea(areaName: string, pluginName: string): void;
    static renderArea(areaName: string): Promise<string>;
    static reset(): void;
}
