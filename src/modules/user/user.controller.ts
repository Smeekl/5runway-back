import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { UserService } from './user.service';
import { User } from './user.decorator';
import { UpdateUserProfileDto, ProfileDto, GetUserResponseDto } from './dto';

@ApiTags('Users endpoints')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  @Get('/profile')
  @ApiOperation({ summary: 'Return user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProfileDto,
  })
  getProfile(@User() { id, email }: GetUserResponseDto) {
    return this.profileService.getProfile(id, email);
  }

  @Put('/profile/update')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProfile(
    @User() user: GetUserResponseDto,
    @Body() updatedUser: UpdateUserProfileDto,
  ) {
    return this.profileService.updateProfile(user.id, updatedUser);
  }
}
