import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common"
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { AppModule } from "../app.module"


describe('AuthResolver', () => {
    let authResolver: AuthResolver;
    let usersService: UsersService;
    let app: INestApplication
  
    beforeEach(async () => {
      process.env.MONGO= "mongo:27017/test"
      const module = await Test.createTestingModule({
        imports: [AppModule]
      }).compile()
  
      app = module.createNestApplication();
      usersService = module.get<UsersService>(UsersService);
      authResolver = module.get<AuthResolver>(AuthResolver);
      await app.init();
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

    it('should be defined', () => {
      expect(app).toBeDefined();
      expect(usersService).toBeDefined()
      expect(authResolver).toBeDefined()
    });

    it('should register user', async() => {
        const value = await authResolver.register(user);
        const result = await usersService.findAll();

        expect(value.access_token).toBeDefined();
        expect(value.user.email).toEqual(result[0].email);
    });

    it('register should throw error if user already exist', async() => {
        const value = await authResolver.register(user);
        const result = await usersService.findAll();

        expect(value.user.email).toEqual(result[0].email);
        await expect(authResolver.register(user))
        .rejects
        .toThrow('User already exists');
    });

    it('should login user', async() => {
        const value = await authResolver.register(user);
        const result = await authResolver.login(login);

        expect(result.access_token).toBeDefined();
        expect(value.user.email).toEqual(result.user.email);
    });

    it('login should throw error if bad credentials', async() => {
        const badlogin = {
            email: 'test@testing.com',
            password: 'bad_password',
        }
        await authResolver.register(user);

        await expect(authResolver.login(badlogin))
        .rejects
        .toThrow('Something went wrong');
    });
  
    afterEach(async () => {
        await usersService.findAll().then((users) => {
          users.forEach(async user => {
            await usersService.deleteById(user._id.toString())
          })
        })
        await app.close();
    });
});
  