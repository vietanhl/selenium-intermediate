const {Browser, By, Key, until} = require("selenium-webdriver");
//mocha
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');

const RsvpPage = require('../pages/rsvp.js');

// suite(function(env){
//     describe('RSVP site', function() {
//         it('has invitee list', function(){
//            //start of the code
//             env.builder().build()
//                 .then(driver => {
//                     driver.get(url)
//                         .then(() => driver.findElements(By.id('invitedList')))
//                         .then(elements => assert(elements.length > 0))
//                         .then(() => driver.quit());
//                 })
//         })
//     });
// });

suite(function(env){
    describe('RSVP site', async function() {
        //timeout - prevent Timeout Promise Error
        this.timeout(3000);
        let driver;  
        //hold page object
        let page;
        // before - executes before runs it()
        before (async function(){
            driver = await env.builder().build();
            page = new RsvpPage(driver);
            await page.open();
        });
        
        it('has invitee list', async function(){
            let elements = await driver.findElements(page.locators.invitedList);
            assert(elements.length > 0);
                });

        it('has registration form', async function(){
          let elements = await driver.findElements(page.locators.registrationForm);
          assert(elements.length > 0);    
        });      

        //after - executed after every it()
        after (async function(){
            driver.quit();
        });

        it('loads existing invitations', async function() {
            //Explicit - Ensure our AJAX call is complete before continuing with the test
            let list = await driver.findElements(page.locators.invitedList);
            await driver.wait(
                //condition to stop waiting. elementLocated will stop the wait as soon as the locator is specified in the doc.
                until.elementLocated(page.locators.invitees)
            );
            let text = await list.getText();
            assert(text.includes("Craig Dennis"));
        });
    })
});
