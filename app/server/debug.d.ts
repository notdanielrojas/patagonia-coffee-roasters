declare module "debug" {
  export function debug(namespace: string): (...args: any[]) => void;
  export function enable(namespaces: string): void;
  export function disable(): void;
  export const formatters: { [key: string]: (v: any) => string };
}
