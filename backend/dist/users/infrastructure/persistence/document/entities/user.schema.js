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
exports.UserSchema = exports.UserSchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_providers_enum_1 = require("../../../../../auth/auth-providers.enum");
const file_schema_1 = require("../../../../../files/infrastructure/persistence/document/entities/file.schema");
const document_entity_helper_1 = require("../../../../../utils/document-entity-helper");
const status_schema_1 = require("../../../../../statuses/infrastructure/persistence/document/entities/status.schema");
const role_schema_1 = require("../../../../../roles/infrastructure/persistence/document/entities/role.schema");
let UserSchemaClass = class UserSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.UserSchemaClass = UserSchemaClass;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
    }),
    __metadata("design:type", Object)
], UserSchemaClass.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserSchemaClass.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: auth_providers_enum_1.AuthProvidersEnum.email,
    }),
    __metadata("design:type", String)
], UserSchemaClass.prototype, "provider", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: null,
    }),
    __metadata("design:type", Object)
], UserSchemaClass.prototype, "socialId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", Object)
], UserSchemaClass.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", Object)
], UserSchemaClass.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: file_schema_1.FileSchemaClass,
    }),
    __metadata("design:type", Object)
], UserSchemaClass.prototype, "photo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: role_schema_1.RoleSchema,
    }),
    __metadata("design:type", Object)
], UserSchemaClass.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: status_schema_1.StatusSchema,
    }),
    __metadata("design:type", status_schema_1.StatusSchema)
], UserSchemaClass.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], UserSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: mongoose_2.now }),
    __metadata("design:type", Date)
], UserSchemaClass.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UserSchemaClass.prototype, "deletedAt", void 0);
exports.UserSchemaClass = UserSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], UserSchemaClass);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserSchemaClass);
exports.UserSchema.index({ 'role._id': 1 });
//# sourceMappingURL=user.schema.js.map