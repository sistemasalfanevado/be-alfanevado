import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class ZentraOllamaService {

  constructor() {

  }

  async askOllama(question: string): Promise<string> {


    let dataTest = [
      {
        "id": "4bab78ca-a634-4544-a2f6-98375d9e7141",
        "bankId": "60eb3a72-b656-46b7-9f38-85a9a3cac881",
        "currencyId": "70684299-05fc-4720-8fca-be3a2ecb67ab",
        "createdAt": "2025-08-07 01:55:01.838",
        "updatedAt": "2025-09-12 00:12:57.915",
        "deletedAt": "",
        "amount": "13033.85",
        "idFirebase": "xNxSXBbxNevPjkmYXhDU",
        "projectId": "086b1de8-1531-4f6f-a662-a3a876b9caae"
      },
      {
        "id": "da511487-a520-4083-8250-c279c4dc2197",
        "bankId": "60eb3a72-b656-46b7-9f38-85a9a3cac881",
        "currencyId": "a1831dfc-a1f7-4075-a66e-fe3f5694e1e4",
        "createdAt": "2025-08-07 01:55:33.813",
        "updatedAt": "2025-09-12 00:13:00.207",
        "deletedAt": "",
        "amount": "35187.54",
        "idFirebase": "QZrVQWLn3onIWEuqEfQL",
        "projectId": "086b1de8-1531-4f6f-a662-a3a876b9caae"
      }
    ]


    const res = await axios.post('http://127.0.0.1:11434/api/chat', {
      model: 'mistral',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente que responde preguntas basadas en datos financieros exportados de PostgreSQL.

Aquí está el dataset de la tabla "BankAccount":

${JSON.stringify(dataTest, null, 2)}
      `,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      stream: false,
    });

    // Ollama responde en message.content o en response según el modelo
    return res.data.message?.content || res.data.response || '[sin respuesta]';
  }
}