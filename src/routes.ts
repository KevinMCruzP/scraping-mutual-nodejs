import { Router } from "express";
import { ScrapingMutual } from "./controllers/ScrapingMutual";

const router = Router();

router.get("/", new ScrapingMutual().handle);

export { router };
