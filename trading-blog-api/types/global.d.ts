declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PORT: string
    readonly API_PREFIX: string
    readonly API_PATH: string
    readonly JWT_SECRET: string
    readonly PASSWORD_SALT: string
    readonly REDIS_HOST: string
    readonly REDIS_PORT: string
    readonly MONGO_PORT: string
    readonly MONGO_DATABASE: string
    readonly MONGO_USERNAME: string
    readonly MONGO_PASSWORD: string
    readonly MONGO_HOST: string
    readonly MAIL_DRIVER: string
    readonly MAIL_HOST: string
    readonly MAIL_PORT: string
    readonly MAIL_USERNAME: string
    readonly MAIL_PASSWORD: string
    readonly MAIL_ENCRYPTION: string
    readonly MAIL_FROM: string
  }
}