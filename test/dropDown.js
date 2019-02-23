const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const DropDownPage = require('../pages/dropDown.js');

suite(function(env) {
    describe('Drop down and Radio buttons', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new DropDownPage(driver);
            await page.open();
        });

        it('Updates status text', async function(){
            await page.clickOption('option3');
            await page.submit();
            let results = await driver.findElement(page.locators.formResults);
            let text = await results.getText();
            assert(text.includes("option3"));
        });

        it('Radio buttons', async function(){
            await page.clickRadioButton('radio2');
            await page.submit();
            let results = await driver.findElement(page.locators.formResults);
            let text = await results.getText();
            assert(text.includes("radio2"));
        });
    

        after(async function() {
            driver.quit();
        });
    });
});