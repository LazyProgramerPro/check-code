export class EmailDTO {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  content?: string;
  context?: any;
}
