const {Browser, By, Key, until} = require("selenium-webdriver");

const url = 'https://crossbrowsertesting.github.io/drag-and-drop.html';

class DragAndDropPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
            draggable: By.id('draggable'),
            droppable: By.id('droppable'),
        }
    }

    open() {
        this.driver.get(url);
    }

    async dragDrop() {
        let draggable = await this.driver.findElement(this.locators.draggable);
        let droppable = await this.driver.findElement(this.locators.droppable);
        
        //need to add bridge:true to fix - UnknownCommandError: Unrecognized command: actions
        await this.driver
            .actions({bridge:true})
            .dragAndDrop(draggable, droppable)
            .perform();
    }

}

module.exports = DragAndDropPage;