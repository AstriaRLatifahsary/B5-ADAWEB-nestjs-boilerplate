"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const auth_user_entity_1 = require("../auth/auth-user.entity");
let Post = class Post {
};
exports.Post = Post;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'likesCount', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repostsCount', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "reposts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'commentsCount', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_user_entity_1.AuthUser, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", auth_user_entity_1.AuthUser)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'quoteOfId' }),
    __metadata("design:type", Object)
], Post.prototype, "quoteOf", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', name: 'createdAt' }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)('posts')
], Post);
//# sourceMappingURL=post.entity.js.map