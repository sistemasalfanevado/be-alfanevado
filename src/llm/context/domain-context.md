# Contexto del dominio (ERP Financiero)

El sistema gestiona usuarios, roles, permisos, bancos, proyectos, presupuestos, documentos y movimientos.  

## Usuarios y Roles
- **User**: Información personal, email, rol, género.
- **Role**: Define permisos y acciones.
- **Action** / **RoleAction**: Acciones que un rol puede ejecutar.
- **Genre**: Clasificación de género.

## Páginas y Permisos
- **PageGroup**: Agrupa páginas.
- **Page**: Página del sistema (ruta, descripción).
- **RolePermission**: Vincula un rol con permisos sobre páginas.

## Finanzas
- **Currency**: Monedas.
- **Bank** / **BankAccount**: Bancos y cuentas.
- **Movement**: Movimiento financiero ligado a presupuesto, documento, cuenta y categoría.
- **MovementCategory** y **FinancialNature**: Naturaleza de movimiento (Ingreso/Gasto).
- **ExchangeRate**: Tipo de cambio diario.
- **BankStatement**: Estados de cuenta.

## Documentos
- **Document**: Contiene montos, tipo, estado, naturaleza y presupuesto.
- **DocumentType**, **DocumentStatus**, **DocumentCategory**: Clasificaciones de documentos.
- **DocumentFile**: Archivos asociados.

## Presupuestos
- **BudgetCategory**: Categorías principales.
- **BudgetItemCategory**: Subcategorías.
- **BudgetNature**: Naturaleza (Ingreso/Gasto).
- **BudgetItemDefinition**: Definiciones de ítems.
- **BudgetItem**: Presupuesto específico con montos.
- **BudgetItemHistory**: Historial de cambios.
- **BudgetIncreaseRequest** / **BudgetIncreaseStatus**: Solicitudes de aumento y su estado.

## Proyectos y Compañías
- **Company**: Empresa.
- **Project**: Proyecto de la empresa.
- **LandingPageRelation**: Relación de proyectos con páginas.

## Terceros (Parties)
- **PartyRole**: Tipo de tercero (Cliente, Proveedor, etc).
- **Party**: Entidad externa.
- **PartyBankAccount**: Cuentas bancarias de terceros.

## Ingresos Programados
- **ScheduledIncomeDocument**: Documento de ingresos programados.
- **Installment** / **InstallmentStatus**: Cuotas asociadas.
- **SaleType** / **Broker**: Tipo de venta y bróker.