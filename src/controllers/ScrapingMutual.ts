import { Request, Response } from "express";
import { handleScrapingMutual } from "../business/businessFunctions";

class ScrapingMutual {
  async handle(req: Request, res: Response) {
    handleScrapingMutual();
    return res.json({ message: "Hello World!!!!" });
  }
}

export { ScrapingMutual };
