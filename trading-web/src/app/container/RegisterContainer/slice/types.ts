/* --- STATE --- */
interface dataProps {
  rc?: number;
  rd?: string;
  email?: string | null;
}

export interface RegisterState {
  data: dataProps;
  stepRegister: number;
}
