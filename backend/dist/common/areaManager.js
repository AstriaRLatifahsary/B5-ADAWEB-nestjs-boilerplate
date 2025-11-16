"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaManager = void 0;
const pluginManager_1 = require("./pluginManager");
class AreaManager {
    static registerToArea(areaName, pluginName) {
        if (!this.areas.has(areaName)) {
            this.areas.set(areaName, new Set());
        }
        const set = this.areas.get(areaName);
        set.add(pluginName);
    }
    static async renderArea(areaName) {
        const set = this.areas.get(areaName);
        if (!set || set.size === 0)
            return '';
        const htmlParts = [];
        for (const pluginName of set) {
            const plugin = pluginManager_1.PluginManager.getPlugin(pluginName);
            if (!plugin)
                continue;
            const out = await plugin.render();
            htmlParts.push(out ?? '');
        }
        return htmlParts.join('\n');
    }
    static reset() {
        this.areas.clear();
    }
}
exports.AreaManager = AreaManager;
AreaManager.areas = new Map();
//# sourceMappingURL=areaManager.js.map