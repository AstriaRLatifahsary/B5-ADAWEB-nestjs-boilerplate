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
exports.Role = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const database_config_1 = __importDefault(require("../../database/config/database.config"));
const idType = (0, database_config_1.default)().isDocumentDatabase
    ? String
    : Number;
class Role {
}
exports.Role = Role;
__decorate([
    (0, class_validator_1.Allow)(),
    (0, swagger_1.ApiProperty)({
        type: idType,
    }),
    __metadata("design:type", Object)
], Role.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'admin',
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
//# sourceMappingURL=role.js.map