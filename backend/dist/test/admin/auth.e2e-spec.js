"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const constants_1 = require("../utils/constants");
describe('Auth', () => {
    const app = constants_1.APP_URL;
    describe('Admin', () => {
        it('should successfully login via /api/v1/auth/email/login (POST)', () => {
            return (0, supertest_1.default)(app)
                .post('/api/v1/auth/email/login')
                .send({ email: constants_1.ADMIN_EMAIL, password: constants_1.ADMIN_PASSWORD })
                .expect(200)
                .expect(({ body }) => {
                expect(body.token).toBeDefined();
                expect(body.user.email).toBeDefined();
                expect(body.user.role).toBeDefined();
            });
        });
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map