import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthService } from '@modules/auth/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [AuthService],
    }).compile();

    app = module.createNestApplication();
    authService = module.get<AuthService>(AuthService);

    await app.init();
  });
});
