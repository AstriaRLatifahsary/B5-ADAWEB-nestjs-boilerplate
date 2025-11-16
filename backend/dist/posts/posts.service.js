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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_user_entity_1 = require("../auth/auth-user.entity");
const post_entity_1 = require("../entities/post.entity");
let PostsService = class PostsService {
    constructor(postRepository, authUserRepository) {
        this.postRepository = postRepository;
        this.authUserRepository = authUserRepository;
    }
    async findAll(limit = 100) {
        const rows = await this.postRepository.query(`SELECT p.id, p.content, p.image, p.createdAt,
              u.username AS user_username, u.displayName AS user_displayName,
              (SELECT COUNT(*) FROM likes l WHERE l.postId = p.id) AS likes,
              (SELECT COUNT(*) FROM comments c WHERE c.postId = p.id) AS comments,
              (SELECT COUNT(*) FROM reposts r WHERE r.postId = p.id) AS reposts
         FROM posts p
         JOIN users u ON u.id = p.userId
        ORDER BY p.createdAt DESC
        LIMIT ?`, [limit]);
        return rows.map((r) => ({
            id: r.id,
            content: r.content,
            image: r.image,
            likes: Number(r.likes) || 0,
            reposts: Number(r.reposts) || 0,
            comments: Number(r.comments) || 0,
            createdAt: r.createdAt,
            name: r.user_displayName || r.user_username || 'Anonim',
            username: r.user_username ? `@${r.user_username}` : '',
        }));
    }
    async create(dto, sessionUsername) {
        let user = null;
        if (sessionUsername) {
            user = await this.authUserRepository.findOne({
                where: { username: sessionUsername },
            });
        }
        const newPost = this.postRepository.create({
            user: user,
            content: dto.content,
            image: dto.image,
        });
        const saved = await this.postRepository.save(newPost);
        const vm = await this.postRepository.query(`SELECT p.id, p.content, p.image, p.createdAt,
              u.username AS user_username, u.displayName AS user_displayName,
              (SELECT COUNT(*) FROM likes l WHERE l.postId = p.id) AS likes,
              (SELECT COUNT(*) FROM comments c WHERE c.postId = p.id) AS comments,
              (SELECT COUNT(*) FROM reposts r WHERE r.postId = p.id) AS reposts
         FROM posts p
         JOIN users u ON u.id = p.userId
        WHERE p.id = ?
        LIMIT 1`, [saved.id]);
        const r = vm[0];
        return {
            id: r.id,
            content: r.content,
            image: r.image,
            likes: Number(r.likes) || 0,
            reposts: Number(r.reposts) || 0,
            comments: Number(r.comments) || 0,
            createdAt: r.createdAt,
            name: r.user_displayName || r.user_username || 'Anonim',
            username: r.user_username ? `@${r.user_username}` : '',
        };
    }
    async update(id, dto, sessionUsername) {
        const post = await this.postRepository.findOne({ where: { id }, relations: { user: true } });
        if (!post) {
            throw new common_1.NotFoundException(`Post dengan ID ${id} tidak ditemukan`);
        }
        if (sessionUsername) {
            if (sessionUsername !== post.user?.username) {
                throw new common_1.ForbiddenException('❌ Kamu tidak diizinkan mengedit postingan ini');
            }
        }
        await this.postRepository.update(id, { content: dto.content });
        const updatedPost = await this.postRepository.findOne({ where: { id }, relations: { user: true } });
        if (!updatedPost) {
            throw new common_1.NotFoundException(`Post dengan ID ${id} tidak ditemukan setelah update`);
        }
        const vm = await this.postRepository.query(`SELECT p.id, p.content, p.image, p.createdAt,
              u.username AS user_username, u.displayName AS user_displayName,
              (SELECT COUNT(*) FROM likes l WHERE l.postId = p.id) AS likes,
              (SELECT COUNT(*) FROM comments c WHERE c.postId = p.id) AS comments,
              (SELECT COUNT(*) FROM reposts r WHERE r.postId = p.id) AS reposts
         FROM posts p
         JOIN users u ON u.id = p.userId
        WHERE p.id = ?
        LIMIT 1`, [id]);
        const r = vm[0];
        return {
            id: r.id,
            content: r.content,
            image: r.image,
            likes: Number(r.likes) || 0,
            reposts: Number(r.reposts) || 0,
            comments: Number(r.comments) || 0,
            createdAt: r.createdAt,
            name: r.user_displayName || r.user_username || 'Anonim',
            username: r.user_username ? `@${r.user_username}` : '',
        };
    }
    async delete(id, sessionUsername) {
        const post = await this.postRepository.findOne({ where: { id }, relations: { user: true } });
        if (!post) {
            throw new common_1.NotFoundException(`Post dengan ID ${id} tidak ditemukan`);
        }
        if (sessionUsername) {
            if (sessionUsername !== post.user?.username) {
                throw new common_1.ForbiddenException('❌ Kamu tidak diizinkan menghapus postingan ini');
            }
        }
        const result = await this.postRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_user_entity_1.AuthUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map