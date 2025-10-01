import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BitrixService {
  private readonly BITRIX_WEBHOOK_URL = 'https://alfanevado.bitrix24.es/rest/8/1mnodak9p0hmxccq/';

  async createLead(formData: any) {
    const url = `${this.BITRIX_WEBHOOK_URL}crm.lead.add`;

    const data = {
      fields: {
        TITLE: `WEB - ${formData.project} - ${formData.name} ${formData.lastname} `,
        NAME: formData.name,
        LAST_NAME: formData.lastname,
        EMAIL: [{ VALUE: formData.email, VALUE_TYPE: 'WORK' }],
        PHONE: [{ VALUE: formData.phone, VALUE_TYPE: 'WORK' }],
        COMMENTS: formData.message,
        SOURCE_ID: 'WEB',
        ASSIGNED_BY_ID: formData.assignedById,
      },
    };

    try {
      const response = await axios.post(url, data);

      if (response.data.result) {
        return { success: true, leadId: response.data.result };
      } else {
        throw new HttpException('Error en la respuesta de Bitrix24', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('No se pudo registrar el lead', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

