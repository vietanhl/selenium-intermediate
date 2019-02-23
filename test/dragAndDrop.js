const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const DragAndDropPage = require('../pages/dragAndDrop.js');

suite(function(env) {
    describe('Drag and Drop', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new DragAndDropPage(driver);
            await page.open();
        });

        it('Updates status text', async function(){
            await page.dragDrop();
            let droppable = await driver.findElement(page.locators.droppable);
            var text = await droppable.getText();
            assert(text.includes("Dropped"));
        });

        after(async function() {
            driver.quit();
        });
    });
});