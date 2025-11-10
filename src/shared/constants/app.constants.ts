/** Códigos de tipo de transacción */
export const TRANSACTION_TYPE = {
  ENTRY: 'fe14bee6-9be4-43a5-9d8f-7fc032751415',
  EXIT: '8b190f70-cc43-42fa-8d7b-6afde6ed10b5',
};

/** IDs de moneda */
export const CURRENCY = {
  SOLES: '70684299-05fc-4720-8fca-be3a2ecb67ab',
  DOLARES: 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4',
};

/** IDs de estados de installments */
export const INSTALLMENT_STATUS = {
  PAGADO: '1d327d95-f1a6-45e8-b036-fcd9c921bdc8',
  PARCIAL: '9b58c847-37d0-4dd9-aaf9-3c499916c8b9',
  PENDIENTE: 'f3da23d6-fced-4410-8ca2-61bd5c716d92',
};

/** IDs de estados de documento */
export const DOCUMENT_STATUS = {
  PAGADO: '98ecd655-c699-4922-97a8-a998931c5226',
  PENDIENTE: 'b194c9a5-4874-4108-a35b-951c898c9c49',
};

export const BUDGET_NATURE = {
  GASTO: '230d0901-b36b-4356-b709-1518eccf7b81',
  COSTO_DIRECTO: 'c2f6ef95-04dd-4a3f-8ecf-1739dd5b4849',
  INGRESO: 'eccee710-3022-4af9-83d1-42f47a9bb3fb',
  SISTEMAS: 'e9fb5a54-7059-4f25-885e-d3a8fd7f4dfa'
};


export const BANK_ACCOUNT_TYPE = {
  AHORROS: 'c79b9e7b-abbc-4964-8d46-4839435d0480',
  CORRIENTE: '425eeb84-5e22-4a4c-85c7-3cd96dec353b',
};

export const BANK_ACCOUNT_HIERARCHY = {
  PRINCIPAL: '75edf088-d3fe-41f5-89f2-a1081b141ae2',
  ADICIONAL: 'f8cf5fc1-a81c-44b8-9368-8e5bb776af1c',
};

export const PARTY_DOCUMENT_TYPE = {
  DNI: 'ed319043-ce78-4c2e-bd90-6b63e6f6121a',
  RUC: '90450094-345b-4535-8536-15dc8e530ba8',
};

export const PARTY_DOCUMENT_HIERARCHY = {
  PRINCIPAL: 'aa3de1fb-9fd2-4d93-b154-a7361171b9e3',
  ADICIONAL: 'd9c9dad5-3993-43e1-ba6c-ac25668b8034',
};

export const EXCHANGE_RATE = {
  COMISION: 'Comisión de transacción',
  SALIDA: 'Mov. Salida',
  ENTRADA: 'Mov. Entrada'
};