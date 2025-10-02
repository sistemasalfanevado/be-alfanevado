import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPasswordResetTokenDto } from './dto/create-zentra-password-reset-token.dto';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class ZentraPasswordResetTokenService {
  constructor(private prisma: PrismaService) { }

  /**
   * Generar token de reseteo de contraseña
   */
  async generateToken(createDto: CreateZentraPasswordResetTokenDto) {
    const { userId, expiresInMinutes = 30 } = createDto;

    // Validar que el usuario exista
    const user = await this.prisma.zentraUser.findUnique({ where: { id: userId } });
    if (!user) return null;

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000); // duración configurable

    await this.prisma.zentraPasswordResetToken.create({
      data: { token, userId, expiresAt },
    });

    return token;
  }

  /**
   * Verificar token (para endpoint /verify)
   */
  async verifyToken(token: string) {
    const resetToken = await this.prisma.zentraPasswordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) throw new NotFoundException('Token inválido');
    if (resetToken.used) throw new BadRequestException('Token ya fue usado');
    if (resetToken.expiresAt < new Date()) throw new BadRequestException('Token expirado');

    return true;
  }

  /**
   * Resetear contraseña usando token
   */
  async resetPassword(token: string, newPassword: string) {
    const resetToken = await this.prisma.zentraPasswordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      return false;
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    await this.prisma.zentraUser.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Marcar token como usado
    await this.prisma.zentraPasswordResetToken.update({
      where: { token },
      data: { used: true },
    });

    return true;
  }

  /**
   * (Opcional) Limpiar tokens expirados
   */
  async cleanExpired() {
    return this.prisma.zentraPasswordResetToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }

  async findAllTokens() {
    const tokens = await this.prisma.zentraPasswordResetToken.findMany({
      include: { user: true },   // traer información del usuario
      orderBy: { createdAt: 'desc' },
    });

    return tokens.map(t => ({
      token: t.token,
      userId: t.userId,
      userName: `${t.user.firstName} ${t.user.lastName}`,
      used: t.used ? 'Usado' : 'No usado',
      expiresAt: this.formatDateTime(t.expiresAt),
      expired: t.expiresAt < new Date() ? 'Expirado' : 'Vigente',
      createdAt: this.formatDateTime(t.createdAt),
    }));
  }

  /**
   * Formatear fecha DD/MM/YYYY HH:mm
   */
  private formatDateTime(date: Date | string): string {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }


}
