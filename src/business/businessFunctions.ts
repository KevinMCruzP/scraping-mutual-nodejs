import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { MutualPersonProps } from "../types";

const url =
  process.env.URL ||
  "https://www.asociaciondemutuales.cl/suseso/responsemutual.html?12.619.984-8?A?INSTITUTO%20DE%20NORMALIZACI%C3%93N%20PREVISIONAL%20(INSTITUTO%20SEGURIDAD%20LABORAL)%20(ISL)";

const urlMutualSearch =
  "https://www.asociaciondemutuales.cl/suseso/mutualsearch.html";

export async function handleSearchMutual({
  rut = "",
  birthDate = "",
}: MutualPersonProps) {
  let text = "";
  let textError = "";

  try {
    console.log("this is the BOT🤖");

    console.log("rut: ", rut, " birthDate: ", birthDate);

    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();
    await page.goto(urlMutualSearch, { waitUntil: "networkidle2" });

    //Inserting data in the input rut and birthDate
    await page.evaluate(
      ({ rut, birthDate }) => {
        document.querySelector<HTMLInputElement>("input[id=rutPersona]").value =
          rut;
        document.querySelector<HTMLInputElement>(
          "input[id=fechaNacpers]"
        ).value = birthDate;
      },
      { rut, birthDate }
    );

    //Click on the button submit
    const button = await page.waitForSelector("#envParams");
    await button.click();

    //Wait for the page to load
    await page.waitForNavigation();

    //Get the new url
    const newUrl = await page.url();
    console.log(newUrl);

    //Get the data from the new page element
    await page.waitForSelector("#ListaMutuales1");

    text = await page.evaluate(() => {
      const messageElement = document.querySelector("#ListaMutuales1");
      return messageElement.textContent;
    });

    if (text != "") {
      //Close browser.
      await browser.close();

      return text;
    } else {
      await page.waitForSelector(".mensajeError");

      textError = await page.evaluate(() => {
        const messageErrorElement = document.querySelector(".mensajeError");
        return messageErrorElement.textContent;
      });

      await browser.close();

      return textError;
    }
  } catch (error) {
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
}

export async function handleScrapingMutual() {
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

    console.log("gpuArr", gpuArr);
    console.log(`You have scraped ${gpuArr.length} registries`);

    //Close browser.
    await browser.close();

    return gpuArr;
  } catch {
    console.error;
  }
}
