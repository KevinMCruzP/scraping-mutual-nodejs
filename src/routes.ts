import { Router } from "express";
import { ScrapingMutual } from "./controllers/ScrapingMutual";
import { SearchMutualController } from "./controllers/SearchMutualController";

const router = Router();

router.get("/searchMutual", new SearchMutualController().handle);
router.get("/scrapingMutual", new ScrapingMutual().handle);

export { router };
