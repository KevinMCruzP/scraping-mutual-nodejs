"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ScrapingMutual_1 = require("./controllers/ScrapingMutual");
const SearchMutualController_1 = require("./controllers/SearchMutualController");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/searchMutual", new SearchMutualController_1.SearchMutualController().handle);
router.get("/scrapingMutual", new ScrapingMutual_1.ScrapingMutual().handle);
//# sourceMappingURL=routes.js.map