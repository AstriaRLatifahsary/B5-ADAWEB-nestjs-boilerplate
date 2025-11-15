"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const supertest_1 = __importDefault(require("supertest"));
const roles_enum_1 = require("../../src/roles/roles.enum");
const statuses_enum_1 = require("../../src/statuses/statuses.enum");
describe('Users Module', () => {
    const app = constants_1.APP_URL;
    let apiToken;
    beforeAll(async () => {
        await (0, supertest_1.default)(app)
            .post('/api/v1/auth/email/login')
            .send({ email: constants_1.ADMIN_EMAIL, password: constants_1.ADMIN_PASSWORD })
            .then(({ body }) => {
            apiToken = body.token;
        });
    });
    describe('Update', () => {
        let newUser;
        const newUserEmail = `user-first.${Date.now()}@example.com`;
        const newUserChangedEmail = `user-first-changed.${Date.now()}@example.com`;
        const newUserPassword = `secret`;
        const newUserChangedPassword = `new-secret`;
        beforeAll(async () => {
            await (0, supertest_1.default)(app)
                .post('/api/v1/auth/email/register')
                .send({
                email: newUserEmail,
                password: newUserPassword,
                firstName: `First${Date.now()}`,
                lastName: 'E2E',
            });
            await (0, supertest_1.default)(app)
                .post('/api/v1/auth/email/login')
                .send({ email: newUserEmail, password: newUserPassword })
                .then(({ body }) => {
                newUser = body.user;
            });
        });
        describe('User with "Admin" role', () => {
            it('should change password for existing user: /api/v1/users/:id (PATCH)', () => {
                return (0, supertest_1.default)(app)
                    .patch(`/api/v1/users/${newUser.id}`)
                    .auth(apiToken, {
                    type: 'bearer',
                })
                    .send({
                    email: newUserChangedEmail,
                    password: newUserChangedPassword,
                })
                    .expect(200);
            });
            describe('Guest', () => {
                it('should login with changed password: /api/v1/auth/email/login (POST)', () => {
                    return (0, supertest_1.default)(app)
                        .post('/api/v1/auth/email/login')
                        .send({
                        email: newUserChangedEmail,
                        password: newUserChangedPassword,
                    })
                        .expect(200)
                        .expect(({ body }) => {
                        expect(body.token).toBeDefined();
                    });
                });
            });
        });
    });
    describe('Create', () => {
        const newUserByAdminEmail = `user-created-by-admin.${Date.now()}@example.com`;
        const newUserByAdminPassword = `secret`;
        describe('User with "Admin" role', () => {
            it('should fail to create new user with invalid email: /api/v1/users (POST)', () => {
                return (0, supertest_1.default)(app)
                    .post(`/api/v1/users`)
                    .auth(apiToken, {
                    type: 'bearer',
                })
                    .send({ email: 'fail-data' })
                    .expect(422);
            });
            it('should successfully create new user: /api/v1/users (POST)', () => {
                return (0, supertest_1.default)(app)
                    .post(`/api/v1/users`)
                    .auth(apiToken, {
                    type: 'bearer',
                })
                    .send({
                    email: newUserByAdminEmail,
                    password: newUserByAdminPassword,
                    firstName: `UserByAdmin${Date.now()}`,
                    lastName: 'E2E',
                    role: {
                        id: roles_enum_1.RoleEnum.user,
                    },
                    status: {
                        id: statuses_enum_1.StatusEnum.active,
                    },
                })
                    .expect(201);
            });
            describe('Guest', () => {
                it('should successfully login via created by admin user: /api/v1/auth/email/login (GET)', () => {
                    return (0, supertest_1.default)(app)
                        .post('/api/v1/auth/email/login')
                        .send({
                        email: newUserByAdminEmail,
                        password: newUserByAdminPassword,
                    })
                        .expect(200)
                        .expect(({ body }) => {
                        expect(body.token).toBeDefined();
                    });
                });
            });
        });
    });
    describe('Get many', () => {
        describe('User with "Admin" role', () => {
            it('should get list of users: /api/v1/users (GET)', () => {
                return (0, supertest_1.default)(app)
                    .get(`/api/v1/users`)
                    .auth(apiToken, {
                    type: 'bearer',
                })
                    .expect(200)
                    .send()
                    .expect(({ body }) => {
                    expect(body.data[0].provider).toBeDefined();
                    expect(body.data[0].email).toBeDefined();
                    expect(body.data[0].hash).not.toBeDefined();
                    expect(body.data[0].password).not.toBeDefined();
                });
            });
        });
    });
});
//# sourceMappingURL=users.e2e-spec.js.map