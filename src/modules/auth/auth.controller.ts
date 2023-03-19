import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateUserRequestLocalDto,
  GetFacebookResponseDto,
  TokenResponseDto,
} from '@modules/user/dto';
import { AuthService } from './auth.service';
import { TQueryAuth } from './types';
import { RefreshTokenRequestDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponseDto })
  @Post('/refresh')
  refresh(@Body() { refreshToken }: RefreshTokenRequestDto) {
    return this.authService.refreshTokens(refreshToken);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('/registration')
  @HttpCode(201)
  registration(@Body() user: CreateUserRequestLocalDto) {
    return this.authService.registerUser(user);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponseDto })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Body() { email }: CreateUserRequestLocalDto) {
    return this.authService.userAuth(email);
  }

  @ApiOperation({ summary: 'Register and login user by google account' })
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponseDto })
  @ApiQuery({ name: 'token' })
  @Get('/google/verification')
  googleVerification(@Query('token') token: string) {
    return this.authService.googleAuth(token);
  }

  @ApiOperation({
    summary:
      'Register and login user to mobile app or when user register in Facebook by phone number',
  })
  @ApiResponse({ status: HttpStatus.OK, type: GetFacebookResponseDto })
  @ApiQuery({ name: 'token', type: String, example: 'ndfsdf.213bh.dfbdsf' })
  @ApiQuery({
    name: 'additionalEmail',
    type: String,
    example: 'egor.guzenko@gmail.com',
  })
  @Get('facebook/verification')
  facebookVerification(@Query() { token, additionalEmail }: TQueryAuth) {
    return this.authService.facebookAuth(token, additionalEmail);
  }
}
