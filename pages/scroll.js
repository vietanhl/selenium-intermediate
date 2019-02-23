const {Browser, By, Key, until} = require("selenium-webdriver");

const url = 'http://scrollmagic.io/examples/advanced/infinite_scrolling.html';

class ScrollPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {    
            boxes: By.css('.box1'),
            loader: By.id('loader'),
        }
    }

    open() {
        this.driver.get(url);
    }

    async loadContent() {
        // We start by calling findElement() on our driver object to find the loader locator we defined above.
        var loader = await this.driver.findElement(this.locators.loader);
        //we pass it our loader element, and then have the JavaScript code scroll that element into view.
        await this.driver.executeScript("arguments[0].scrollIntoView();", loader);
        //add an explicit wait here that waits until the loader element no longer has the "active" class.
        await this.driver.wait(until.elementLocated(By.css('#loader:not(.active)')));
    }
}

module.exports = ScrollPage;