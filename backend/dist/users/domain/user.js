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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const class_transformer_1 = require("class-transformer");
const file_1 = require("../../files/domain/file");
const role_1 = require("../../roles/domain/role");
const status_1 = require("../../statuses/domain/status");
const swagger_1 = require("@nestjs/swagger");
const database_config_1 = __importDefault(require("../../database/config/database.config"));
const idType = (0, database_config_1.default)().isDocumentDatabase
    ? String
    : Number;
class User {
}
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: idType,
    }),
    __metadata("design:type", Object)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'john.doe@example.com',
    }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'email',
    }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: '1234567890',
    }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    __metadata("design:type", Object)
], User.prototype, "socialId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'John',
    }),
    __metadata("design:type", Object)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'Doe',
    }),
    __metadata("design:type", Object)
], User.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => file_1.FileType,
    }),
    __metadata("design:type", Object)
], User.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => role_1.Role,
    }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => status_1.Status,
    }),
    __metadata("design:type", status_1.Status)
], User.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
//# sourceMappingURL=user.js.map