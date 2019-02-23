const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const ScrollPage = require('../pages/scroll.js');

suite(function(env) {
    describe('Infinite scroll', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new ScrollPage(driver);
            await page.open();
        });

        // We need to add a test to check whether more boxes get
        // added when we scroll.
        it('adds more boxes', async function() {
            let boxes = await driver.findElements(page.locators.boxes);
            let oldBoxCount = boxes.length;
            console.log(oldBoxCount);

            await page.loadContent();
            // After the call to loadContent() completes, there should be more boxes on the page.
            boxes = await driver.findElements(page.locators.boxes);
            let newBoxCount = boxes.length;
            console.log(newBoxCount);
            assert(newBoxCount > oldBoxCount);
        });

        after(async function() {
            driver.quit();
        });
    });
});