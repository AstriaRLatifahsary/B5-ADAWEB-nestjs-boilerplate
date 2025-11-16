"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoService = void 0;
const common_1 = require("@nestjs/common");
let DemoService = class DemoService {
    constructor() {
        this.items = [];
    }
    findAll() {
        return this.items;
    }
    create(dto, ownerId) {
        const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
        const now = new Date().toISOString();
        const item = {
            id,
            title: dto.title,
            description: dto.description,
            ownerId,
            createdAt: now,
        };
        this.items.push(item);
        return item;
    }
    findOne(id) {
        const item = this.items.find((i) => i.id === id);
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        return item;
    }
    update(id, dto) {
        const item = this.findOne(id);
        item.title = dto.title ?? item.title;
        item.description = dto.description ?? item.description;
        item.updatedAt = new Date().toISOString();
        return item;
    }
    remove(id) {
        const index = this.items.findIndex((i) => i.id === id);
        if (index === -1)
            throw new common_1.NotFoundException('Item not found');
        this.items.splice(index, 1);
    }
};
exports.DemoService = DemoService;
exports.DemoService = DemoService = __decorate([
    (0, common_1.Injectable)()
], DemoService);
//# sourceMappingURL=demo.service.js.map