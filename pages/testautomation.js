export class TestAutomation {
    constructor(page) {
        this.page = page;
        this.username = page.locator("#name");
        this.mail = page.locator("//input[@id='email']");
        this.mobile = page.locator("id=phone");
        this.address = page.locator('#textarea');
        this.maleRadio = page.locator("#male");
        this.femaleRadio = page.locator("#female");
        this.sundayCheck = page.locator("#sunday");
        this.mondayCheck = page.locator("#monday");
        this.tuesdayCheck = page.locator("#tuesday");
        this.wednesdayCheck = page.locator("#wednesday");
        this.thursdayCheck = page.locator("#thursday");
        this.fridayCheck = page.locator("#friday");
        this.saturdayCheck = page.locator("#saturday");
        this.selectDropDown = page.locator("#country");
        this.unsortDropdown = page.locator("#colors");
        this.sortDropdown = page.locator("#animals");
        this.datepick = page.locator("[data-date='3']");
        this.txtpick = page.locator("#datepicker");
        this.custom = page.locator("#txtDate");
        this.selMonth = page.locator("//select[@class ='ui-datepicker-month']");
        this.selyear = page.locator("//select[@class ='ui-datepicker-year']");
        this.start = page.getByPlaceholder("Start Date");
        this.end = page.getByPlaceholder("End Date");
        this.submitBTN = page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' });
        this.upload = page.locator("#singleFileInput");
        this.submitfile = page.locator("//button[normalize-space() ='Upload Single File']");
        this.doubleCl = page.locator("//button[normalize-space() ='Copy Text']");
        this.field1 = page.locator("#field1");
        this.field2 = page.locator("#field2");
        this.simple = page.locator("#alertBtn");
        this.confirm = page.locator("#confirmBtn");
        this.prompt = page.locator("#promptBtn");
        this.newtab = page.locator("//button[text() = 'New Tab']");
        this.popup = page.locator("#PopUp");
        this.staticRow = page.locator("#HTML1 tbody tr");
        this.staticCOl = page.locator("#HTML1 thead th");
        this.dynamicRow = page.locator("#HTML12 tbody tr");
        this.source = page.locator("#draggable");
        this.target = page.locator("#droppable");
        this.labels = page.locator("//div[@id ='mobiles']/label");
        this.links = page.locator("a");
        this.pointBTN = page.getByRole("button", { name: "Point Me" });
    }
    async openBrowser() {
        await this.page.goto("https://testautomationpractice.blogspot.com/");
    }
    async inputField(username, mail, mobileNumber, address) {
        await this.username.fill(username);
        await this.mail.fill(mail);
        await this.mobile.fill(mobileNumber);
        await this.address.fill(address);
    }
    async selectMale() {
        await this.maleRadio.check();
    }
    async selectFemale() {
        await this.femaleRadio.check();
    }
    async checkBox() {
        await this.sundayCheck.check();
        await this.mondayCheck.check();
        await this.tuesdayCheck.check();
        await this.wednesdayCheck.check();
        await this.thursdayCheck.check();
        await this.fridayCheck.check();
        await this.saturdayCheck.check();
    }
    async dropDown() {
        await this.selectDropDown.selectOption("india");
        await this.unsortDropdown.selectOption("yellow");
        await this.sortDropdown.selectOption("zebra");
    }
    async datePicker() {
        await this.txtpick.click();
        await this.datepick.click();
    }
    async customDate() {
        await this.custom.click();
        await this.selMonth.selectOption("Aug");
        await this.selyear.selectOption("2024");
        await this.datepick.click();
    }
    async daterange() {
        await this.start.click();
        await this.start.fill("2026-11-10");
        await this.end.fill("2028-11-10");
        await this.submitBTN.click();
    }
    async uploadFile() {
        await this.upload.setInputFiles("C:/Users/navee/Downloads/1793179086626.jpg");
        await this.submitfile.click();
    }
    async doubleClick() {
        await this.doubleCl.dblclick();
        const field1value = await this.field1.getAttribute("value");
        return field1value;
    }
    async simpleAlert() {
        let message;
        this.page.once("dialog", async dialog => {
            message = dialog.message();
            console.log("Alert Message: " + message);
            console.log("Alert type:" + dialog.type())
            await dialog.accept();
        });
        await this.simple.click();
        return message;
    }
    async confirmAlert() {
        let message2;
        this.page.once("dialog", async dialog => {
            message2 = await dialog.message();
            console.log("Alert Message: " + message2);
            console.log("Alert type:" + dialog.type())
            await dialog.accept();
        });
        await this.confirm.click();
        return message2;
    }
    async promptAlert() {
        this.page.once("dialog", async dialog => {
            console.log("Alert type:" + dialog.type())
            await dialog.accept("darling");
        });
        await this.prompt.click();
        const promptMessage = await this.page.locator("#demo").innerText();
        console.log("prompt message: " + promptMessage);
        return promptMessage;
    }
    async windowHandle() {
        const pagePromise = this.page.context().waitForEvent("page");
        await this.newtab.click();
        const newpage = await pagePromise;
        const newPageUrl = newpage.url();
        const pagescount = await this.page.context().pages().length;
        console.log("New Page URL :" + newPageUrl);
        console.log("No.of windows in windowHandle() :" + pagescount);
        return newpage;
    }
    async popupHandle() {
        const popPromise = this.page.waitForEvent("popup");
        await this.popup.click();
        const pop = await popPromise;
        const popupCount = await this.page.context().pages().length;
        console.log("No.of Pages in popup Handle :" + popupCount);
        const popurl = pop.url();
        console.log("Popup URL :" + popurl);
        return pop;
    }
    async staticTable() {
        const rows = this.staticRow;
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const cells = await rows.nth(i).locator("td").allTextContents();
            if (cells.length > 0) {
                console.log(`Row ${i + 1}:`, cells);
            }
        }
        const book = this.staticRow.filter({ hasText: "mukesh" });
        return book;

    }
    async dynamicTable() {
        const rows = this.dynamicRow;
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const cells = await rows.nth(i).locator("td").allTextContents();
            if (cells.length > 0) {
                console.log(`Row ${i + 1}:`, cells);
            }
        }
        const desktop = this.dynamicRow.filter({ hasText: "Internet Explorer" });
        return desktop;
    }
    async dragandDrop() {

        await this.source.dragTo(this.target);
    }
    async getLabelsText() {
        const labelsText = await this.labels.allInnerTexts();
        console.log(labelsText);

        return labelsText;
    }
    async checkBrokenLinks(request) {
        const count = await this.links.count();
        const brokenlinks = [];
        for (let i = 0; i < count; i++) {
            const url = await this.links.nth(i).getAttribute("href");
            if (!url || !url.startsWith("http")) {
                continue;

            }
            try {
                const response = await request.get(url, { timeout: 10000, failOnStatusCode: false });
                if (response.status() >= 400) {
                    brokenlinks.push({ url, status: response.status() });

                }
            } catch (error) {
                brokenlinks.push({ url, status: "response failed" });
            }
        }
        return brokenlinks;
    }
    async pointMe(){
        await this.pointBTN.hover();
    }
    async 


}
