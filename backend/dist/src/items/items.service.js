"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
let ItemsService = class ItemsService {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    findAll() {
        return this.items;
    }
    create(data, userId) {
        const item = {
            id: this.nextId++,
            title: data.title,
            description: data.description ?? null,
            createdAt: new Date().toISOString(),
            createdBy: userId,
        };
        this.items.push(item);
        return item;
    }
    findById(id) {
        return this.items.find((i) => i.id === id) ?? null;
    }
    update(id, data, userId) {
        const index = this.items.findIndex((i) => i.id === id);
        if (index === -1)
            return null;
        const current = this.items[index];
        const updated = {
            ...current,
            title: data.title ?? current.title,
            description: data.description ?? current.description,
        };
        this.items[index] = updated;
        return updated;
    }
    remove(id) {
        const index = this.items.findIndex((i) => i.id === id);
        if (index === -1)
            return false;
        this.items.splice(index, 1);
        return true;
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)()
], ItemsService);
//# sourceMappingURL=items.service.js.map