export interface Student {
  id?: string;
  dni: string;
  name: string;
  lastName: string;
  promotion: string;
  registerDate?: Date;
  status: string; // Utilizado para el borrado lógico y restauración
}