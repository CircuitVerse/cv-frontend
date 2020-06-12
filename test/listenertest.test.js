/**
 * @jest-environment jsdom
 */

const puppeteer = require('puppeteer')
let browser
let page

beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto('file:///home/deku/2sim/index.html')
})

describe('button', function () {
    it("zooms on clicking button", async () => {
        const prevScale = await page.evaluate(() => globalScope.scale);
        await page.click('#zoomIn')
        const newScale = await page.evaluate(() => globalScope.scale);
        expect(newScale).toBeGreaterThan(prevScale);
    },100000)

    it("zooms on scrlling", async () => {
        const prevScale = await page.evaluate(() => globalScope.scale);
        await page.waitForSelector('#simulationArea');
        await page.hover('#simulationArea');
        await page.evaluate(() => {
            var cEvent = new Event('mousewheel');
            cEvent.detail = -53;
            document.querySelector('#simulationArea').dispatchEvent(cEvent)
        });
        const newScale = await page.evaluate(() => globalScope.scale);
        expect(newScale).toBeGreaterThan(prevScale);
    });

    afterAll(async () => {
        await browser.close()
    })
});
