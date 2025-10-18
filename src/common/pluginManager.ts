export interface Plugin {
  name: string;
  render: () => Promise<string> | string;
}

export class PluginManager {
  private static plugins: Map<string, Plugin> = new Map();

  static register(plugin: Plugin) {
    if (this.plugins.has(plugin.name)) {
      // prevent duplicate registration during dev HMR/reloads
      return;
    }
    this.plugins.set(plugin.name, plugin);
  }

  static getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  static has(name: string): boolean {
    return this.plugins.has(name);
  }

  // For tests/debugging
  static reset() {
    this.plugins.clear();
  }
}
