import { Request, Response } from "express";
import { handleSearchMutual } from "../business/businessFunctions";
import { MutualPersonProps } from "../types";

class SearchMutualController {
  async handle(req: Request, res: Response) {
    try {
      const data: MutualPersonProps = req.body;
      const message = await handleSearchMutual(data);

      return res.status(200).json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { SearchMutualController };
