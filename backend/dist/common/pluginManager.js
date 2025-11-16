"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
class PluginManager {
    static register(plugin) {
        if (this.plugins.has(plugin.name)) {
            return;
        }
        this.plugins.set(plugin.name, plugin);
    }
    static getPlugin(name) {
        return this.plugins.get(name);
    }
    static has(name) {
        return this.plugins.has(name);
    }
    static reset() {
        this.plugins.clear();
    }
}
exports.PluginManager = PluginManager;
PluginManager.plugins = new Map();
//# sourceMappingURL=pluginManager.js.map