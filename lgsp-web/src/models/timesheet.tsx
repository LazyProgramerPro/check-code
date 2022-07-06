export interface Timesheet {
  id: string;
  name: string;
  code: string;
}

export interface CreateTimesheetVariable {
  name?: string;
  code?: string;
}

export interface UpdateTimesheetVariable {
  type: string;
  params?: any;
  saveAndClose?: boolean;
  // payload?: Employee;
  // error?: AppError;
  id: string;
}
