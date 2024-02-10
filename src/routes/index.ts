import { Router } from "express";
import { readdirSync } from "fs";

const pathRouter = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName: string) => {
  return fileName.replace(".ts", "");
};

readdirSync(pathRouter).filter((file) => {
  const cleanName = cleanFileName(file);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
