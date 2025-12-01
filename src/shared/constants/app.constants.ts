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

/** IDs de estados de party rol */
export const PARTY_ROL = {
  CLIENTE: '1a5a5dfe-f56d-4874-8485-6bf7252b34d5',
  PROVEEDOR: 'e4eaff1f-a7c4-482b-93c4-0c6ff27c1816',
  CLIENTE_PROVEEDOR: '88f4dd34-9fac-467c-af2e-e84c59cef75a',
};

/** IDs de estados de documento */
export const DOCUMENT_STATUS = {
  PAGADO: '98ecd655-c699-4922-97a8-a998931c5226',
  PENDIENTE: 'b194c9a5-4874-4108-a35b-951c898c9c49',
};

export const DOCUMENT_CATEGORY = {
  CLASICO: '0c4d8c87-aaed-4e08-8520-14e79fad324c',
  RENDICION_CUENTA: 'b07b084a-6822-4a4a-b93f-868f9ea36488',
  DEVOLUCION: 'e82da912-b142-4cb2-b3e2-623b266a912b',
};

export const BUDGET_NATURE = {
  GASTO: '230d0901-b36b-4356-b709-1518eccf7b81',
  COSTO_DIRECTO: 'c2f6ef95-04dd-4a3f-8ecf-1739dd5b4849',
  INGRESO: 'eccee710-3022-4af9-83d1-42f47a9bb3fb',
  SISTEMAS: 'e9fb5a54-7059-4f25-885e-d3a8fd7f4dfa',
  CUADRE: '22feac37-28c0-410a-8533-5254dfc202f1',
  RENDICION_CUENTA: '94f5dbc1-bbb0-49bb-87ce-452613d99759',
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

export const MOVEMENT_CATEGORY = {
  TRANSFERENCIA: '22dff505-62ab-4239-bb85-b8214212fa09',
  RENTABILIDAD: '708d4aa7-194b-4e9f-8c3c-82b4e2b69704',
  INVERSION: '8bf377ae-39e0-4569-b87a-2686119cb1b0',
  DEUDA: 'f058573b-6982-4b69-8d8e-b9a5b7e3c6f5',
  OPEFINANCIERA: '7b53fac7-ea3f-4f07-8fac-3cfa35732053'
};

export const ACCOUNTABILITY_STATUS = {
  PENDIENTE: '44c68755-aa30-4fac-b1cd-a4b74da34705',
  LIQUIDADO: '9424337e-eb71-47b5-bc3c-a29f143cb872',
  RENDICION_PENDIENTE: '3f4c8421-a79d-455e-b22b-83bd41f10c35',
  VALIDACION_CONTABLE_PENDIENTE: '4ec5cd46-555b-41eb-9a26-fb2abf7c6fa9'
};

export const DOCUMENT_ORIGIN = {
  CLASICO: 'd4560e69-0114-4176-8ca9-6d33c7ea8db1',
  RENDICION_CUENTAS: 'bbc7792b-07e8-4fe1-a705-c78934d3f3c9',
};

export const FINANCIAL_IMPACT = {
  AMBOS: '0803c878-e73d-4647-8028-99acdb3c1479',
  CUENTA_BANCARIA: '7896a165-2d40-44fe-95b4-e08414a263d0',
  PARTIDA: 'e38c91b2-9142-455b-a5a6-855ec45bbeaf',
};

export const DOCUMENT_TYPE = {
  RENDICION_CUENTA: 'ce02d26d-99cb-40a0-aec6-b47ecf85f314',
  ADELANTO: 'd6c19939-2f6d-425e-a4bc-c31f49d514c3',
  DEVOLUCION_USUARIO: '94c666b5-2324-435f-b3ab-6b4330db174b',
};

export const BANK = {
  BCP: '60eb3a72-b656-46b7-9f38-85a9a3cac881',
};

