"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingMutual = void 0;
const businessFunctions_1 = require("../business/businessFunctions");
class ScrapingMutual {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, businessFunctions_1.handleScrapingMutual)();
            return res.json({ message: "Hello World!!!!" });
        });
    }
}
exports.ScrapingMutual = ScrapingMutual;
//# sourceMappingURL=ScrapingMutual.js.map