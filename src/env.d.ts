// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_PRODUCTION: string;
  readonly NG_APP_SERVER_PORT: string;
  readonly NG_APP_USER_API_URL: string;
  readonly NG_APP_ADMIN_API_URL: string;
  readonly NG_APP_EMPLOYEE_API_URL: string;
  readonly NG_APP_CHAT_API_URL: string;
  readonly NG_APP_NOTIFICATION_API_URL: string;
  readonly NG_APP_KEY_ID: string;
  readonly NG_APP_KEY_SECRET: string;
  [key: string]: any; 
}

declare interface ImportMeta {
  readonly env: Env;
}
