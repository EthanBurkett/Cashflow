"use server";

import { generateEnvTypes } from "./lib/utils";

export const ready = async () => {
  generateEnvTypes();
};
