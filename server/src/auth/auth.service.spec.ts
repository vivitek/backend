import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common"
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AppModule } from "../app.module"


describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let app: INestApplication

    beforeEach(async () => {
      process.env.MONGO= "mongo:27017/test"
      const module = await Test.createTestingModule({
        imports: [AppModule]
      }).compile()

      app = module.createNestApplication();
      service = module.get<AuthService>(AuthService);
      usersService = module.get<UsersService>(UsersService);
      await app.init();
    });

    it('should be defined', () => {
      expect(app).toBeDefined();
      expect(service).toBeDefined()
      expect(usersService).toBeDefined()
    });

    it('should register user', async() => {
        const value = await service.register(user);
        const result = await usersService.findAll();

        expect(value.access_token).toBeDefined();
        expect(value.user.email).toEqual(result[0].email);
    });

    it('register should throw error if user already exist', async() => {
        const value = await service.register(user);
        const result = await usersService.findAll();

        expect(value.user.email).toEqual(result[0].email);
        await expect(service.register(user))
        .rejects
        .toThrow('User already exists');
    });

    it('should login user', async() => {
        const value = await service.register(user);
        const result = await service.login(login);

        expect(result.access_token).toBeDefined();
        expect(value.user.email).toEqual(result.user.email);
    });

    it('login should throw error if bad credentials', async() => {
        const badlogin = {
            email: 'test@testing.com',
            password: 'bad_password',
        }
        await service.register(user);

        await expect(service.login(badlogin))
        .rejects
        .toThrow('Something went wrong');
    });

    it('should validate user', async() => {
        const value = await service.register(user);
        const result = await service.validateUser(login);

        expect(value.user.email).toEqual(result.email);
        expect(value.user.username).toEqual(result.username);
        expect(value.user._id).toEqual(result._id);
    });

    it('should return null if bad credentials', async() => {
        await service.register(user);
        const result = await service.validateUser({email: 'test@testing.com', password: 'bad_password'});

        expect(result).toEqual(null);
    });

    it('should login admin', async () => {
        const value = await service.register(admin);
        const result = await service.loginGodView(admin);

        expect(result.access_token).toBeDefined();
        expect(value.user.email).toEqual(result.user.email);
    })

    it ('should not log non admin', async () => {
        await service.register(user)

        await expect(service.loginGodView(user))
            .rejects
            .toThrow('Forbidden');
    })

    afterEach(async () => {
        await usersService.findAll().then((users) => {
          users.forEach(async user => {
            await usersService.deleteById(user._id.toString())
          })
        })
        await app.close();
    });

    const user = {
        email: 'test@testing.com',
        username: 'username',
        password: 'password',
    }
    const login = {
        email: 'test@testing.com',
        password: 'password',
    }
    const admin = {
        email: "superAdmin@vincipit.com",
        username: "admin",
        password: "admin"
    }
});
