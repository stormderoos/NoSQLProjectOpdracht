/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(6), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DtoModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let DtoModule = exports.DtoModule = class DtoModule {
};
exports.DtoModule = DtoModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], DtoModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.UpsertUserDto = exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(7);
const api_1 = __webpack_require__(8);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
class UpsertUserDto {
    constructor() {
        this.profileImgUrl = '';
        this.role = api_1.UserRole.User;
        this.gender = api_1.UserGender.Unknown;
    }
}
exports.UpsertUserDto = UpsertUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpsertUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpsertUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpsertUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Object)
], UpsertUserDto.prototype, "profileImgUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof api_1.UserRole !== "undefined" && api_1.UserRole) === "function" ? _a : Object)
], UpsertUserDto.prototype, "role", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof api_1.UserGender !== "undefined" && api_1.UserGender) === "function" ? _b : Object)
], UpsertUserDto.prototype, "gender", void 0);
class UpdateUserDto {
    constructor() {
        this.profileImgUrl = '';
        this.role = api_1.UserRole.User;
        this.gender = api_1.UserGender.Unknown;
    }
}
exports.UpdateUserDto = UpdateUserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Object)
], UpdateUserDto.prototype, "profileImgUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof api_1.UserRole !== "undefined" && api_1.UserRole) === "function" ? _c : Object)
], UpdateUserDto.prototype, "role", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof api_1.UserGender !== "undefined" && api_1.UserGender) === "function" ? _d : Object)
], UpdateUserDto.prototype, "gender", void 0);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(9), exports);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserGender = exports.UserRole = void 0;
/**
 * Rol van de gebruiker (bijvoorbeeld fan of clubbeheerder)
 */
var UserRole;
(function (UserRole) {
    UserRole["User"] = "user";
    UserRole["ClubOwner"] = "clubowner";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserGender;
(function (UserGender) {
    UserGender["Male"] = "Men";
    UserGender["Female"] = "female";
    UserGender["Unknown"] = "";
})(UserGender || (exports.UserGender = UserGender = {}));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerPosition = void 0;
var PlayerPosition;
(function (PlayerPosition) {
    PlayerPosition["GK"] = "GK";
    PlayerPosition["LB"] = "LB";
    PlayerPosition["CB"] = "CB";
    PlayerPosition["RB"] = "RB";
    PlayerPosition["CDM"] = "CDM";
    PlayerPosition["CM"] = "CM";
    PlayerPosition["CAM"] = "CAM";
    PlayerPosition["LW"] = "LW";
    PlayerPosition["ST"] = "ST";
    PlayerPosition["RW"] = "RW";
    PlayerPosition["Unknown"] = "";
})(PlayerPosition || (exports.PlayerPosition = PlayerPosition = {}));


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClubDto = exports.CreateClubDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(7);
class CreateClubDto {
}
exports.CreateClubDto = CreateClubDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateClubDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateClubDto.prototype, "location", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateClubDto.prototype, "logoUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateClubDto.prototype, "players", void 0);
class UpdateClubDto {
}
exports.UpdateClubDto = UpdateClubDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateClubDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateClubDto.prototype, "location", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateClubDto.prototype, "logoUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdateClubDto.prototype, "players", void 0);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePlayerDto = exports.CreatePlayerDto = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(7);
class CreatePlayerDto {
}
exports.CreatePlayerDto = CreatePlayerDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreatePlayerDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreatePlayerDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreatePlayerDto.prototype, "position", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreatePlayerDto.prototype, "clubId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreatePlayerDto.prototype, "birthdate", void 0);
class UpdatePlayerDto {
}
exports.UpdatePlayerDto = UpdatePlayerDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePlayerDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePlayerDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePlayerDto.prototype, "position", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePlayerDto.prototype, "clubId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], UpdatePlayerDto.prototype, "birthdate", void 0);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseInterceptor = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const operators_1 = __webpack_require__(19);
let ApiResponseInterceptor = exports.ApiResponseInterceptor = class ApiResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((results) => {
            if (results) {
                return {
                    results: results,
                    info: {
                        version: '1.0',
                        type: results instanceof Array ? 'list' : 'object',
                        count: results instanceof Array ? results.length : 1
                    }
                };
            }
            else {
                return {
                    results: undefined,
                    info: {
                        version: '1.0',
                        type: 'none',
                        count: 0
                    }
                };
            }
        }));
    }
};
exports.ApiResponseInterceptor = ApiResponseInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ApiResponseInterceptor);


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
/**
 * https://docs.nestjs.com/exception-filters#exception-filters-1
 */
let HttpExceptionFilter = exports.HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter = tslib_1.__decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionsFilter = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
let AllExceptionsFilter = exports.AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest())
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter = tslib_1.__decorate([
    (0, common_1.Catch)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.HttpAdapterHost !== "undefined" && core_1.HttpAdapterHost) === "function" ? _a : Object])
], AllExceptionsFilter);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMatchDto = exports.CreateMatchDto = exports.AssistEntryDto = exports.ScoreEntryDto = void 0;
class ScoreEntryDto {
}
exports.ScoreEntryDto = ScoreEntryDto;
class AssistEntryDto {
}
exports.AssistEntryDto = AssistEntryDto;
class CreateMatchDto {
}
exports.CreateMatchDto = CreateMatchDto;
class UpdateMatchDto {
}
exports.UpdateMatchDto = UpdateMatchDto;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_1 = __webpack_require__(24);
const user_1 = __webpack_require__(32);
const mongoose_1 = __webpack_require__(26);
const util_env_1 = __webpack_require__(49);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_1.AuthModule,
            mongoose_1.MongooseModule.forRoot(util_env_1.environment.MONGO_DB_CONNECTION_STRING, {
                connectionFactory: (connection) => {
                    connection.on('connected', () => {
                        common_1.Logger.verbose(`Mongoose connected to ${util_env_1.environment.MONGO_DB_CONNECTION_STRING}`);
                    });
                    return connection;
                },
            }),
            user_1.UsersModule
        ],
    })
], AppModule);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(26);
const auth_controller_1 = __webpack_require__(27);
const jwt_1 = __webpack_require__(29);
const user_1 = __webpack_require__(32);
const auth_service_1 = __webpack_require__(28);
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_1.User.name, schema: user_1.UserSchema }]),
            user_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: process.env['JWT_SECRET'] || 'secretstring',
                signOptions: { expiresIn: '12 days' }
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthController_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(28);
const decorators_1 = __webpack_require__(31);
const api_1 = __webpack_require__(8);
const dto_1 = __webpack_require__(3);
let AuthController = exports.AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(credentials) {
        this.logger.log('Login');
        return await this.authService.login(credentials);
    }
    async register(user) {
        this.logger.log('Register');
        return await this.authService.register(user);
    }
};
tslib_1.__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_1.IUserCredentials !== "undefined" && api_1.IUserCredentials) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = AuthController_1 = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(29);
const mongoose_1 = __webpack_require__(26);
const mongoose_2 = __webpack_require__(30);
let AuthService = exports.AuthService = AuthService_1 = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(credentials) {
        this.logger.log('validateUser');
        const user = await this.userModel.findOne({ email: credentials.email });
        if (user && user.password === credentials.password) {
            return user;
        }
        return null;
    }
    async login(credentials) {
        this.logger.log('login ' + credentials.email);
        const user = await this.userModel
            .findOne({ email: credentials.email })
            .select('+password')
            .exec();
        if (user && user.password === credentials.password) {
            const payload = {
                user_id: user._id,
                role: user.role,
            };
            return {
                id: user.id,
                name: user.username,
                email: user.email,
                profileImgUrl: user.profileImgUrl,
                role: user.role,
                token: this.jwtService.sign(payload),
            };
        }
        const errMsg = 'Email not found or password invalid';
        throw new common_1.UnauthorizedException(errMsg);
    }
    async register(dto) {
        this.logger.log(`Register user ${dto.username}`);
        const existing = await this.userModel.findOne({ email: dto.email });
        if (existing) {
            this.logger.debug('User already exists');
            throw new common_1.ConflictException('User already exists');
        }
        const newUser = await this.userModel.create(dto);
        const payload = {
            user_id: newUser._id,
            role: newUser.role,
        };
        return {
            id: newUser.id,
            name: newUser.username,
            email: newUser.email,
            profileImgUrl: newUser.profileImgUrl,
            role: newUser.role,
            token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService = AuthService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('User')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(26);
const api_1 = __webpack_require__(8);
let User = exports.User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, select: false }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: Object.values(api_1.UserRole),
        default: api_1.UserRole.User
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof api_1.UserRole !== "undefined" && api_1.UserRole) === "function" ? _a : Object)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png'
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "profileImgUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        enum: Object.values(api_1.UserGender),
        default: api_1.UserGender.Unknown
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof api_1.UserGender !== "undefined" && api_1.UserGender) === "function" ? _b : Object)
], User.prototype, "gender", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(30);
const mongoose_2 = __webpack_require__(26);
const user_schema_1 = __webpack_require__(33);
let UserService = exports.UserService = UserService_1 = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    mapUser(user) {
        const { _id, __v, ...rest } = user;
        return { id: _id.toString(), ...rest };
    }
    async findAll() {
        const users = await this.userModel.find().lean().exec();
        return users.map(user => this.mapUser(user));
    }
    async findOne(_id) {
        this.logger.log(`Finding user with id ${_id}`);
        const item = await this.userModel.findOne({ _id }).lean().exec();
        if (!item) {
            this.logger.debug('User not found');
            return null;
        }
        return this.mapUser(item);
    }
    async findOneByEmail(email) {
        const item = await this.userModel
            .findOne({ email })
            .select('-password')
            .lean()
            .exec();
        return item ? this.mapUser(item) : null;
    }
    async create(user) {
        const createdItem = await this.userModel.create(user);
        const userObject = createdItem.toObject();
        return this.mapUser(userObject);
    }
    async updateUser(_id, updateUserDto) {
        const currentUser = await this.userModel.findById(_id);
        if (!currentUser) {
            return null;
        }
        if (updateUserDto.password) {
            currentUser.password = updateUserDto.password;
        }
        if (updateUserDto.username)
            currentUser.username = updateUserDto.username;
        if (updateUserDto.email)
            currentUser.email = updateUserDto.email;
        if (updateUserDto.profileImgUrl)
            currentUser.profileImgUrl = updateUserDto.profileImgUrl;
        await currentUser.save();
        return this.mapUser(currentUser.toObject());
    }
};
exports.UserService = UserService = UserService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserExistGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(26);
const mongoose_2 = __webpack_require__(30);
let UserExistGuard = exports.UserExistGuard = class UserExistGuard {
    constructor(userModel) {
        this.userModel = userModel;
    }
    canActivate(context) {
        const user = context.switchToHttp().getRequest().body;
        return !!this.userModel.findOne({ username: user.username });
    }
};
exports.UserExistGuard = UserExistGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('User')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserExistGuard);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const user_controller_1 = __webpack_require__(37);
const user_service_1 = __webpack_require__(34);
const mongoose_1 = __webpack_require__(26);
const user_schema_1 = __webpack_require__(33);
const club_controller_1 = __webpack_require__(38);
const club_service_1 = __webpack_require__(39);
const club_schema_1 = __webpack_require__(40);
const player_schema_1 = __webpack_require__(41);
const player_controller_1 = __webpack_require__(44);
const player_service_1 = __webpack_require__(45);
const match_schema_1 = __webpack_require__(42);
const match_controller_1 = __webpack_require__(46);
const match_service_1 = __webpack_require__(47);
let UsersModule = exports.UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: club_schema_1.Club.name, schema: club_schema_1.ClubSchema },
                { name: player_schema_1.Player.name, schema: player_schema_1.PlayerSchema },
                { name: match_schema_1.Match.name, schema: match_schema_1.MatchSchema },
            ])
        ],
        controllers: [user_controller_1.UserController, club_controller_1.ClubController, player_controller_1.PlayerController, match_controller_1.MatchController],
        providers: [user_service_1.UserService, club_service_1.ClubService, player_service_1.PlayerService, match_service_1.MatchService],
        exports: [user_service_1.UserService, club_service_1.ClubService, player_service_1.PlayerService, match_service_1.MatchService]
    })
], UsersModule);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const user_service_1 = __webpack_require__(34);
const dto_1 = __webpack_require__(3);
const user_exists_guard_1 = __webpack_require__(35);
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        return this.userService.findAll();
    }
    async findOne(id) {
        return this.userService.findOne(id);
    }
    create(user) {
        return this.userService.create(user);
    }
    update(id, user) {
        return this.userService.updateUser(id, user);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(user_exists_guard_1.UserExistGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof dto_1.UpdateUserDto !== "undefined" && dto_1.UpdateUserDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserController.prototype, "update", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClubController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const club_service_1 = __webpack_require__(39);
const dto_1 = __webpack_require__(3);
const club_exists_guard_1 = __webpack_require__(43);
let ClubController = exports.ClubController = class ClubController {
    constructor(clubService) {
        this.clubService = clubService;
    }
    async findAll() {
        return this.clubService.findAll();
    }
    async findOne(id) {
        return this.clubService.findOne(id);
    }
    create(club) {
        return this.clubService.create(club);
    }
    update(id, club) {
        return this.clubService.update(id, club);
    }
    async deleteClub(id) {
        await this.clubService.delete(id);
    }
    async findPlayers(id) {
        return this.clubService.findPlayersByClub(id);
    }
    getClubMatches(id) {
        return this.clubService.findMatchesByClub(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ClubController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ClubController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseGuards)(club_exists_guard_1.ClubExistGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateClubDto !== "undefined" && dto_1.CreateClubDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ClubController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof dto_1.UpdateClubDto !== "undefined" && dto_1.UpdateClubDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ClubController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ClubController.prototype, "deleteClub", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/players'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ClubController.prototype, "findPlayers", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/matches'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ClubController.prototype, "getClubMatches", null);
exports.ClubController = ClubController = tslib_1.__decorate([
    (0, common_1.Controller)('clubs'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof club_service_1.ClubService !== "undefined" && club_service_1.ClubService) === "function" ? _a : Object])
], ClubController);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ClubService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClubService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(30);
const mongoose_2 = __webpack_require__(26);
const club_schema_1 = __webpack_require__(40);
const player_schema_1 = __webpack_require__(41);
const match_schema_1 = __webpack_require__(42);
let ClubService = exports.ClubService = ClubService_1 = class ClubService {
    constructor(clubModel, playerModel, matchModel) {
        this.clubModel = clubModel;
        this.playerModel = playerModel;
        this.matchModel = matchModel;
        this.logger = new common_1.Logger(ClubService_1.name);
    }
    async findAll() {
        this.logger.log(`Finding all clubs`);
        return this.clubModel.find().lean().exec();
    }
    async findOne(_id) {
        this.logger.log(`Finding club with id ${_id}`);
        // Probeer de club te vinden
        const club = await this.clubModel.findOne({ _id }).lean().exec();
        if (!club) {
            this.logger.debug(`Club with id ${_id} not found`);
        }
        return club;
    }
    async create(club) {
        this.logger.log(`Creating club ${club.name}`);
        const createdClub = new this.clubModel(club);
        const savedClub = await createdClub.save();
        return savedClub.toObject();
    }
    async update(_id, club) {
        this.logger.log(`Updating club with id ${_id}`);
        return this.clubModel
            .findByIdAndUpdate(_id, club, { new: true })
            .lean()
            .exec();
    }
    async delete(_id) {
        this.logger.log(`Deleting club with id ${_id}`);
        const club = await this.clubModel.findByIdAndDelete(_id).lean().exec();
        if (!club) {
            this.logger.debug(`Club with id ${_id} not found, cannot delete`);
            throw new common_1.HttpException('Club not found', 404);
        }
        return club;
    }
    async findPlayersByClub(clubId) {
        this.logger.log(`Finding players for club with id ${clubId}`);
        const club = await this.clubModel.findById(clubId).exec();
        if (!club) {
            throw new common_1.HttpException('Club not found', 404);
        }
        return this.playerModel.find({ _id: { $in: club.players } }).lean().exec();
    }
    async canUserDeleteClub(userId, role, clubId) {
        const club = await this.findOne(clubId);
        if (!club)
            return false;
        if (role === 'Admin')
            return true;
        if (role === 'Clubbeheerder')
            return true;
        return false;
    }
    async findMatchesByClub(clubId) {
        return this.matchModel.find({
            $or: [{ home_club_id: clubId }, { away_club_id: clubId }],
        }).lean().exec();
    }
};
exports.ClubService = ClubService = ClubService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(club_schema_1.Club.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(player_schema_1.Player.name)),
    tslib_1.__param(2, (0, mongoose_2.InjectModel)(match_schema_1.Match.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], ClubService);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClubSchema = exports.Club = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(26);
let Club = exports.Club = class Club {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Club.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Club.prototype, "location", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
    }),
    tslib_1.__metadata("design:type", String)
], Club.prototype, "logoUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Club.prototype, "players", void 0);
exports.Club = Club = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Club);
exports.ClubSchema = mongoose_1.SchemaFactory.createForClass(Club);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerSchema = exports.Player = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(26);
let Player = exports.Player = class Player {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Player.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Player.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['GK', 'LB', 'CB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'ST', 'RW'],
    }),
    tslib_1.__metadata("design:type", String)
], Player.prototype, "position", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    tslib_1.__metadata("design:type", String)
], Player.prototype, "clubId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Player.prototype, "birthdate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: '/assets/footballplayer.png',
    }),
    tslib_1.__metadata("design:type", String)
], Player.prototype, "profileImageUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Player.prototype, "goals", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Player.prototype, "assists", void 0);
exports.Player = Player = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Player);
exports.PlayerSchema = mongoose_1.SchemaFactory.createForClass(Player);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchSchema = exports.Match = exports.AssistEntrySchema = exports.AssistEntry = exports.ScoreEntrySchema = exports.ScoreEntry = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(26);
let ScoreEntry = exports.ScoreEntry = class ScoreEntry {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], ScoreEntry.prototype, "playerId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 1 }),
    tslib_1.__metadata("design:type", Number)
], ScoreEntry.prototype, "goals", void 0);
exports.ScoreEntry = ScoreEntry = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], ScoreEntry);
exports.ScoreEntrySchema = mongoose_1.SchemaFactory.createForClass(ScoreEntry);
let AssistEntry = exports.AssistEntry = class AssistEntry {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], AssistEntry.prototype, "playerId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 1 }),
    tslib_1.__metadata("design:type", Number)
], AssistEntry.prototype, "assists", void 0);
exports.AssistEntry = AssistEntry = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], AssistEntry);
exports.AssistEntrySchema = mongoose_1.SchemaFactory.createForClass(AssistEntry);
let Match = exports.Match = class Match {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Match.prototype, "date", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Match.prototype, "location", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Match.prototype, "home_club_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Match.prototype, "away_club_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    tslib_1.__metadata("design:type", Number)
], Match.prototype, "score_home", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    tslib_1.__metadata("design:type", Number)
], Match.prototype, "score_away", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ScoreEntrySchema], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Match.prototype, "scorers", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [exports.AssistEntrySchema], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Match.prototype, "assisters", void 0);
exports.Match = Match = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Match);
exports.MatchSchema = mongoose_1.SchemaFactory.createForClass(Match);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClubExistGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(26);
const mongoose_2 = __webpack_require__(30);
let ClubExistGuard = exports.ClubExistGuard = class ClubExistGuard {
    constructor(clubModel) {
        this.clubModel = clubModel;
    }
    canActivate(context) {
        const club = context.switchToHttp().getRequest().body;
        return this.clubModel
            .findOne({ name: club.name })
            .then((existingClub) => !existingClub);
    }
};
exports.ClubExistGuard = ClubExistGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('Club')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ClubExistGuard);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const player_service_1 = __webpack_require__(45);
const dto_1 = __webpack_require__(3);
let PlayerController = exports.PlayerController = class PlayerController {
    constructor(playerService) {
        this.playerService = playerService;
    }
    async findAll() {
        return this.playerService.findAll();
    }
    async findOne(id) {
        return this.playerService.findOne(id);
    }
    async create(createPlayerDto) {
        return this.playerService.create(createPlayerDto);
    }
    async update(id, updatePlayerDto) {
        return this.playerService.update(id, updatePlayerDto);
    }
    async remove(id) {
        await this.playerService.remove(id);
    }
    async findByClub(clubId) {
        return this.playerService.findByClub(clubId);
    }
    async getPlayerStats(id) {
        return this.playerService.getPlayerStats(id);
    }
    async patchClubId(id, body) {
        return this.playerService.update(id, { clubId: body.clubId });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PlayerController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PlayerController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof dto_1.CreatePlayerDto !== "undefined" && dto_1.CreatePlayerDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PlayerController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.UpdatePlayerDto !== "undefined" && dto_1.UpdatePlayerDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PlayerController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PlayerController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Get)('club/:clubId'),
    tslib_1.__param(0, (0, common_1.Param)('clubId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PlayerController.prototype, "findByClub", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/stats'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PlayerController.prototype, "getPlayerStats", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], PlayerController.prototype, "patchClubId", null);
exports.PlayerController = PlayerController = tslib_1.__decorate([
    (0, common_1.Controller)('players'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof player_service_1.PlayerService !== "undefined" && player_service_1.PlayerService) === "function" ? _a : Object])
], PlayerController);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var PlayerService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(26);
const mongoose_2 = __webpack_require__(30);
const player_schema_1 = __webpack_require__(41);
let PlayerService = exports.PlayerService = PlayerService_1 = class PlayerService {
    constructor(playerModel) {
        this.playerModel = playerModel;
        this.logger = new common_1.Logger(PlayerService_1.name);
    }
    async findAll() {
        this.logger.log('Fetching all players');
        return this.playerModel.find().lean().exec();
    }
    async findOne(id) {
        this.logger.log(`Fetching player with ID: ${id}`);
        return this.playerModel.findById(id).lean().exec();
    }
    async create(createPlayerDto) {
        this.logger.log(`Creating player: ${createPlayerDto.firstName} ${createPlayerDto.lastName}`);
        const newPlayer = new this.playerModel(createPlayerDto);
        return newPlayer.save();
    }
    async update(id, updatePlayerDto) {
        this.logger.log(`Updating player with ID: ${id}`);
        return this.playerModel.findByIdAndUpdate(id, updatePlayerDto, { new: true }).lean().exec();
    }
    async remove(id) {
        this.logger.log(`Deleting player with ID: ${id}`);
        await this.playerModel.findByIdAndDelete(id).exec();
    }
    async findByClub(clubId) {
        this.logger.log(`Fetching players for club with ID: ${clubId}`);
        return this.playerModel.find({ clubId: clubId }).lean().exec();
    }
    async getPlayerStats(playerId) {
        const player = await this.playerModel.findById(playerId).lean().exec();
        if (!player) {
            throw new common_1.NotFoundException('Speler niet gevonden');
        }
        return {
            goals: player.goals,
            assists: player.assists,
        };
    }
    async incrementGoals(playerId, numberOfGoals) {
        await this.playerModel.findByIdAndUpdate(playerId, { $inc: { goals: numberOfGoals } });
    }
    async incrementAssists(playerId, numberOfAssists) {
        await this.playerModel.findByIdAndUpdate(playerId, { $inc: { assists: numberOfAssists } });
    }
};
exports.PlayerService = PlayerService = PlayerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(player_schema_1.Player.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], PlayerService);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const match_service_1 = __webpack_require__(47);
const dto_1 = __webpack_require__(3);
let MatchController = exports.MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    async findAll() {
        return this.matchService.findAll();
    }
    async findOne(id) {
        return this.matchService.findOne(id);
    }
    async create(match) {
        return this.matchService.create(match);
    }
    async update(id, match) {
        return this.matchService.update(id, match);
    }
    async delete(id) {
        return this.matchService.delete(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], MatchController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MatchController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateMatchDto !== "undefined" && dto_1.CreateMatchDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MatchController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof dto_1.UpdateMatchDto !== "undefined" && dto_1.UpdateMatchDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MatchController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MatchController.prototype, "delete", null);
exports.MatchController = MatchController = tslib_1.__decorate([
    (0, common_1.Controller)('matches'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof match_service_1.MatchService !== "undefined" && match_service_1.MatchService) === "function" ? _a : Object])
], MatchController);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var MatchService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(26);
const mongoose_2 = __webpack_require__(30);
const match_schema_1 = __webpack_require__(42);
const club_service_1 = __webpack_require__(39);
const player_service_1 = __webpack_require__(45);
let MatchService = exports.MatchService = MatchService_1 = class MatchService {
    constructor(matchModel, clubService, playerService) {
        this.matchModel = matchModel;
        this.clubService = clubService;
        this.playerService = playerService;
        this.logger = new common_1.Logger(MatchService_1.name);
    }
    async findAll() {
        this.logger.log('Finding all matches');
        return this.matchModel.find().populate('home_club_id away_club_id').lean().exec();
    }
    async findOne(_id) {
        this.logger.log(`Finding match with id ${_id}`);
        return this.matchModel.findById(_id).populate('home_club_id away_club_id').lean().exec();
    }
    async create(match) {
        this.logger.log(`Creating match between ${match.home_club_id} and ${match.away_club_id}`);
        const createdMatch = new this.matchModel(match);
        const savedMatch = await createdMatch.save();
        return savedMatch.toObject();
    }
    async update(_id, match) {
        this.logger.log(`Updating match with id ${_id}`);
        const existingMatch = await this.matchModel.findById(_id).lean().exec();
        if (!existingMatch) {
            throw new common_1.NotFoundException(`Match with id ${_id} not found`);
        }
        const updatedMatch = await this.matchModel
            .findByIdAndUpdate(_id, match, { new: true })
            .populate('home_club_id away_club_id')
            .lean()
            .exec();
        if (existingMatch.scorers && existingMatch.scorers.length) {
            for (const scorer of existingMatch.scorers) {
                await this.playerService.incrementGoals(scorer.playerId, -(scorer.goals ?? 1));
            }
        }
        if (existingMatch.assisters && existingMatch.assisters.length) {
            for (const assister of existingMatch.assisters) {
                await this.playerService.incrementAssists(assister.playerId, -(assister.assists ?? 1));
            }
        }
        if (match.scorers && match.scorers.length) {
            for (const scorer of match.scorers) {
                await this.playerService.incrementGoals(scorer.playerId, scorer.goals ?? 1);
            }
        }
        if (match.assisters && match.assisters.length) {
            for (const assister of match.assisters) {
                await this.playerService.incrementAssists(assister.playerId, assister.assists ?? 1);
            }
        }
        return updatedMatch;
    }
    async delete(_id) {
        this.logger.log(`Deleting match with id ${_id}`);
        await this.matchModel.findByIdAndDelete(_id).exec();
    }
};
exports.MatchService = MatchService = MatchService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(match_schema_1.Match.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof club_service_1.ClubService !== "undefined" && club_service_1.ClubService) === "function" ? _b : Object, typeof (_c = typeof player_service_1.PlayerService !== "undefined" && player_service_1.PlayerService) === "function" ? _c : Object])
], MatchService);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthGuard_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(29);
let AuthGuard = exports.AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.log('No token found');
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env['JWT_SECRET'] || 'secretstring'
            });
            this.logger.log('payload', payload);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard = AuthGuard_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthGuard);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: true,
    ROOT_DOMAIN_URL: 'https://jolly-meadow-00d0ed103.5.azurestaticapps.net',
    dataApiUrl: 'https://nx-worskhop-nestjs-acdcg6hqd9b4cja2.westeurope-01.azurewebsites.net/api',
    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://swderoos:swWelkom01!@footballdbcluster.vsocs.mongodb.net/',
};


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const dto_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(23);
const util_env_1 = __webpack_require__(49);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const corsOptions = {
        origin: 'http://localhost:4200',
        credentials: true,
    };
    app.enableCors(corsOptions);
    app.useGlobalInterceptors(new dto_1.ApiResponseInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    common_1.Logger.log('Running in production mode?', util_env_1.environment.production);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    const appUrl = await app.getUrl();
    common_1.Logger.log(`🚀 DATA-API server is running on: ${appUrl}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map