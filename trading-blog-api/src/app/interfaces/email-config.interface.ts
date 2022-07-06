interface AuthOptions {
  user?: string;
  pass?: string;
}

export interface EmailConfigOptions {
  host: string;
  port: number;
  auth?: AuthOptions;
}
