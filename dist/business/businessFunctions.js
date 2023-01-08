"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleScrapingMutual = exports.handleSearchMutual = void 0;
const cheerio = __importStar(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = process.env.URL ||
    "https://www.asociaciondemutuales.cl/suseso/responsemutual.html?12.619.984-8?A?INSTITUTO%20DE%20NORMALIZACI%C3%93N%20PREVISIONAL%20(INSTITUTO%20SEGURIDAD%20LABORAL)%20(ISL)";
const urlMutualSearch = "https://www.asociaciondemutuales.cl/suseso/mutualsearch.html";
function handleSearchMutual({ rut = "", birthDate = "", }) {
    return __awaiter(this, void 0, void 0, function* () {
        let text = "";
        let textError = "";
        try {
            console.log("this is the BOT🤖");
            console.log("rut: ", rut, " birthDate: ", birthDate);
            const browser = yield puppeteer_1.default.launch();
            // Create a new page
            const page = yield browser.newPage();
            yield page.goto(urlMutualSearch, { waitUntil: "networkidle2" });
            //Inserting data in the input rut and birthDate
            yield page.evaluate(({ rut, birthDate }) => {
                document.querySelector("input[id=rutPersona]").value =
                    rut;
                document.querySelector("input[id=fechaNacpers]").value = birthDate;
            }, { rut, birthDate });
            //Click on the button submit
            const button = yield page.waitForSelector("#envParams");
            yield button.click();
            //Wait for the page to load
            yield page.waitForNavigation();
            //Get the new url
            const newUrl = yield page.url();
            console.log(newUrl);
            //Get the data from the new page element
            yield page.waitForSelector("#ListaMutuales1");
            text = yield page.evaluate(() => {
                const messageElement = document.querySelector("#ListaMutuales1");
                return messageElement.textContent;
            });
            if (text != "") {
                //Close browser.
                yield browser.close();
                return text;
            }
            else {
                yield page.waitForSelector(".mensajeError");
                textError = yield page.evaluate(() => {
                    const messageErrorElement = document.querySelector(".mensajeError");
                    return messageErrorElement.textContent;
                });
                yield browser.close();
                return textError;
            }
        }
        catch (error) {
            return error.message.toString();
        }
        //test --------------------------
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto("https://en.wikipedia.org", { waitUntil: "networkidle2" });
        // await page.waitForSelector("#searchInput");
        // await page.$eval("input[name=search]", (el) => (el.value = "JavaScript"));
        // await page.click("#searchButton");
        // await page.waitForSelector("#Adoption_by_Microsoft");
        // await browser.newPage();
        // const html = await page.content();
        // const text = await page.evaluate(() => {
        //   const anchor = document.querySelector("#Adoption_by_Microsoft");
        //   return anchor.textContent;
        // });
        // console.log(text);
        // await browser.close();
    });
}
exports.handleSearchMutual = handleSearchMutual;
function handleScrapingMutual() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Launch a new browser instance
            const browser = yield puppeteer_1.default.launch();
            console.log("this is the scrapping");
            // Create a new page
            const page = yield browser.newPage();
            // Go to the website
            yield page.goto("https://www.asociaciondemutuales.cl/suseso/responsemutual.html?12.619.984-8?A?INSTITUTO%20DE%20NORMALIZACI%C3%93N%20PREVISIONAL%20(INSTITUTO%20SEGURIDAD%20LABORAL)%20(ISL)");
            // Extract the pagination information
            const html = yield page.content();
            const $ = cheerio.load(html);
            const gpuArr = [];
            $(".listaMutuales").each(function () {
                const description = $(this).find("#ListaMutuales1").text();
                const gpu = { description };
                gpuArr.push(gpu);
            });
            console.log("gpuArr", gpuArr);
            console.log(`You have scraped ${gpuArr.length} registries`);
            //Close browser.
            yield browser.close();
            return gpuArr;
        }
        catch (_a) {
            console.error;
        }
    });
}
exports.handleScrapingMutual = handleScrapingMutual;
//# sourceMappingURL=businessFunctions.js.map