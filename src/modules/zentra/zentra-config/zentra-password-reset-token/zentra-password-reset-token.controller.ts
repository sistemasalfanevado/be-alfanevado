import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ZentraPasswordResetTokenService } from './zentra-password-reset-token.service';
import { CreateZentraPasswordResetTokenDto } from './dto/create-zentra-password-reset-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-password-reset')
export class ZentraPasswordResetTokenController {
  constructor(
    private readonly passwordResetService: ZentraPasswordResetTokenService,
  ) { }

  /**
   * (Solo Admin) Genera un token de reseteo de contraseña
   */
  @Post('generate')
  async generate(@Body() createDto: CreateZentraPasswordResetTokenDto) {
    const token = await this.passwordResetService.generateToken(createDto);

    if (!token) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      message: 'Token generado con éxito'
    };
  }

  @Public()
  @Post('reset')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const success = await this.passwordResetService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );

    if (!success) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return { message: 'Contraseña actualizada con éxito' };
  }

  @Public()
  @Post('verify')
  async verify(@Body() body: { token: string }) {
    const isValid = await this.passwordResetService.verifyToken(body.token);

    if (!isValid) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return { message: 'Token válido' };
  }

  @Get('all')
  async findAll() {
    return this.passwordResetService.findAllTokens();
  }
}
