declare module 'aws-sdk-mock' {
  export function mock(service: string, method: string, replace: any): object;

  export function restore(service: string, method?: string): void;
}
