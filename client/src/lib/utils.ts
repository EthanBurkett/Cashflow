import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// import { readFileSync, writeFileSync } from "fs";
// import { Env } from "../../env";

// export async function generateEnvTypes() {
//   const envRaw = readFileSync(process.cwd() + "/.env.local", "utf-8");
//   const env = envRaw.split("\n").reduce((acc, line) => {
//     const [key, value] = line.split("=");
//     acc[key] = value;
//     return acc;
//   }, {} as Record<string, string>);
//   const envTypes = Object.keys(env).map((key) => {
//     return `  "${key}": string;`;
//   });

//   writeFileSync(
//     process.cwd() + "/env.d.ts",
//     `export interface Env { \n${envTypes.join("\n")}\n}`
//   );
// }

// export const env = process.env as unknown as Env;

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
