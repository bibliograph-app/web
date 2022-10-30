declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly NEXT_PUBLIC_GRAPHQL_API_URL: string;
  }
}
