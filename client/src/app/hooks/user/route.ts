import { writeFileSync } from "fs";

export const POST = async (req: Request) => {
  writeFileSync(`${process.cwd()}/userWebhook.json`, JSON.stringify(req.body));
};
