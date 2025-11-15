export interface Plugin {
    name: string;
    render: () => Promise<string> | string;
}
export declare class PluginManager {
    private static plugins;
    static register(plugin: Plugin): void;
    static getPlugin(name: string): Plugin | undefined;
    static has(name: string): boolean;
    static reset(): void;
}
