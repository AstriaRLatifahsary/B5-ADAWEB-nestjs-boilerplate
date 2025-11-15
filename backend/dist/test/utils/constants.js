"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_PORT = exports.MAIL_HOST = exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = exports.TESTER_PASSWORD = exports.TESTER_EMAIL = exports.APP_URL = void 0;
exports.APP_URL = `http://localhost:${process.env.APP_PORT}`;
exports.TESTER_EMAIL = 'john.doe@example.com';
exports.TESTER_PASSWORD = 'secret';
exports.ADMIN_EMAIL = 'admin@example.com';
exports.ADMIN_PASSWORD = 'secret';
exports.MAIL_HOST = process.env.MAIL_HOST;
exports.MAIL_PORT = process.env.MAIL_CLIENT_PORT;
//# sourceMappingURL=constants.js.map