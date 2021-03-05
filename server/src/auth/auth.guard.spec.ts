import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common"
import { UsersService } from '../users/users.service';
import { AuthService } from "../auth/auth.service";
import { AppModule } from "../app.module"
import axios from 'axios';
import gql from 'graphql-tag';
import { print } from 'graphql';

describe('AuthResolver', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let app: INestApplication

    beforeEach(async () => {
      process.env.MONGO= "mongo:27017/test"
      const module = await Test.createTestingModule({
        imports: [AppModule]
      }).compile()

      app = module.createNestApplication();
      usersService = module.get<UsersService>(UsersService);
      authService = module.get<AuthService>(AuthService);
      await app.init();
      await app.listen(3000);
    });

    const user = {
      email: 'test@testing.com',
      password: 'password',
      username: 'username',
    }
    const ME_QUERY = gql`
      query {
        me {
          username
          email
          _id
        }
      }
    `

    it('me function with good token work', async () => {
      const value = await authService.register(user);
  
      try {
        const result = await axios({
          url: 'http://localhost:3000/graphql',
          method: 'post',
          headers: {
            authorization: 'Bearer ' + value.access_token
          },
          data: {query: print(ME_QUERY)}
        })
        expect(value.user._id.toString()).toEqual(result.data.data.me._id.toString());
        expect(value.user.email).toEqual(result.data.data.me.email);
        expect(value.user.username).toEqual(result.data.data.me.username);
      } catch(error) {
        console.log(error)
      }
    });

    it('me function with bad token work', async () => {
      await authService.register(user);
  
      try {
        const result = await axios({
          url: 'http://localhost:3000/graphql',
          method: 'post',
          headers: {
            authorization: 'Bearer ' + 'wrong_token'
          },
          data: {query: print(ME_QUERY)}
        })
        expect(result.data.errors[0].message).toEqual('Invalid Token');
      } catch(error) {
        console.log(error)
      }
    });

    it('me function without Bearer work', async () => {
      await authService.register(user);
  
      try {
        const result = await axios({
          url: 'http://localhost:3000/graphql',
          method: 'post',
          headers: {
            authorization: 'wrong_token'
          },
          data: {query: print(ME_QUERY)}
        })
        expect(result.data.errors[0].message).toEqual('Invalid Token');
      } catch(error) {
        console.log(error)
      }
    });

    it('me function without header work', async () => {
      await authService.register(user);
  
      try {
        const result = await axios({
          url: 'http://localhost:3000/graphql',
          method: 'post',
          data: {query: print(ME_QUERY)}
        })
        expect(result.data.errors[0].message).toEqual('Forbidden resource');
      } catch(error) {
        console.log(error)
      }
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
