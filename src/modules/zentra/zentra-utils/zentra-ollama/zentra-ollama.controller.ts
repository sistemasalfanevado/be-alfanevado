import { Controller, Post, Body } from '@nestjs/common';
import { ZentraOllamaService } from './zentra-ollama.service';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-ollama')
export class ZentraOllamaController {
  constructor(private readonly zentraOllamaService: ZentraOllamaService) { }

  // Endpoint para preguntar a Ollama
  @Post('ask')
  @Public()
  async ask(@Body('question') question: string) {
    const response = await this.zentraOllamaService.askOllama(question);
    return { response };
  }
}