import * as cheerio from "cheerio";
import { Request, Response } from "express";
import puppeteer from "puppeteer";

const url: any =
  process.env.URL ||
  "https://www.asociaciondemutuales.cl/suseso/responsemutual.html?12.619.984-8?A?INSTITUTO%20DE%20NORMALIZACI%C3%93N%20PREVISIONAL%20(INSTITUTO%20SEGURIDAD%20LABORAL)%20(ISL)";

class ScrapingMutual {
  async handle(req: Request, res: Response) {
    pupp();
    return res.json({ message: "Hello World!!!!" });
  }
}

export { ScrapingMutual };

async function pupp() {
  const browser = await puppeteer.launch();
  console.log("this is the scrapping");
  // Create a new page
  const page = await browser.newPage();
  await page.goto(
    "https://www.asociaciondemutuales.cl/suseso/mutualsearch.html",
    { waitUntil: "networkidle2" }
  );
  console.log("Entre");
  await page.waitForSelector("#rutPersona");
  await page.$eval("input[id=rutPersona]", (el) => (el.value = "12.619.984-8"));
  await page.waitForSelector("#fechaNacpers");
  await page.$eval("input[id=fechaNacpers]", (el) => (el.value = "21/07/1974"));
  await page.click("#envParams");
  await page.waitForSelector("#ListaMutuales1");
  const text = await page.evaluate(() => {
    const anchor = document.querySelector("#ListaMutuales1");
    return anchor.textContent;
  });
  console.log("text", text);
  await browser.close();

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
}

const scrapping = async () => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    console.log("this is the scrapping");

    // Create a new page
    const page = await browser.newPage();

    // Go to the website
    await page.goto(
      "https://www.asociaciondemutuales.cl/suseso/responsemutual.html?12.619.984-8?A?INSTITUTO%20DE%20NORMALIZACI%C3%93N%20PREVISIONAL%20(INSTITUTO%20SEGURIDAD%20LABORAL)%20(ISL)"
    );

    // Extract the pagination information
    const html = await page.content();
    const $ = cheerio.load(html);

    const gpuArr: any = [];
    $(".listaMutuales").each(function (this: any) {
      const description: string = $(this).find("#ListaMutuales1").text();

      const gpu: any = { description };
      gpuArr.push(gpu);
    });

    // console.log("gpuArr", gpuArr);
    // console.log(`You have scraped ${gpuArr.length} registries`);

    console.log(gpuArr);

    return gpuArr;

    // Close browser.
    // await browser.close();
  } catch {
    console.error;
  }
};
