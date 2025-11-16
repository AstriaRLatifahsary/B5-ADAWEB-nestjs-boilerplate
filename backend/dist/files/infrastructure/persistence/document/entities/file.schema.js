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
exports.FileSchema = exports.FileSchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const document_entity_helper_1 = require("../../../../../utils/document-entity-helper");
let FileSchemaClass = class FileSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.FileSchemaClass = FileSchemaClass;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FileSchemaClass.prototype, "path", void 0);
exports.FileSchemaClass = FileSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], FileSchemaClass);
exports.FileSchema = mongoose_1.SchemaFactory.createForClass(FileSchemaClass);
//# sourceMappingURL=file.schema.js.map