const {Browser, By, Key, until} = require("selenium-webdriver");

const url = 'https://treehouse-projects.github.io/selenium-webdriver-intermediate/byjs/app/';

class ButtonsPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
           status: By.id('status'),
           //finding element using JS
           saveButton: By.js(function(){
               var buttons = document.getElementsByTagName('button');
               for (i=0; i<buttons.length; i++){
                   if (buttons[i].textContent === "Save"){
                       return buttons[i];
                   }
               }
           })
        }
    }

    open() {
        this.driver.get(url);
    }

    async clickSave() {
        var button = await this.driver.findElement(this.locators.saveButton);
        await button.click();
    }
    
}

module.exports = ButtonsPage;