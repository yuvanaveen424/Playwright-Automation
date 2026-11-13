import { test, expect } from "@playwright/test";
import { TestAutomation } from "../pages/testautomation";
import logger from "../logs/logger";
import { log } from "node:console";
test.describe("TestAutomation Suite", () => {
    let testAuto;
    test.beforeEach("Opening Browser", async ({ page }) => {
        testAuto = new TestAutomation(page);
        //Opening Test Automation Browser.
        await testAuto.openBrowser();
        logger.info("Test Automation browser opened successfully");
    });
    test("TestAutomation page input Validation", async ({ page }) => {
        logger.info("========Test Automation Suite Execution Started=========");
        const title = await page.title();
        logger.info("Page Title :" + title);
        await expect(page).toHaveTitle("Automation Testing Practice");
        await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
        logger.info("URL & Title validation commpleted successfully");
        // Input field Vaidation
        await testAuto.inputField("Raja Ravi", "rajaravi@gmail.com", "9876543210", "13/14/2b,ramapura,mysore.")
        await expect(testAuto.username).toHaveValue("Raja Ravi");
        await expect(testAuto.mail).toHaveValue("rajaravi@gmail.com");
        await expect(testAuto.mobile).toHaveValue("9876543210");
        await expect(testAuto.address).toHaveValue("13/14/2b,ramapura,mysore.");
        logger.info("Input field validation completed successfully");
        //Radio Buttons Validation
        await testAuto.selectFemale();
        await expect(testAuto.femaleRadio).toBeChecked();
        await testAuto.selectMale();
        await expect(testAuto.maleRadio).toBeChecked();
        logger.info("Radio button validation completed successfully");
        //CheckBox Validation.
        await testAuto.checkBox();
        await expect(testAuto.sundayCheck).toBeChecked();
        await expect(testAuto.mondayCheck).toBeChecked();
        await expect(testAuto.tuesdayCheck).toBeChecked();
        await expect(testAuto.wednesdayCheck).toBeChecked();
        await expect(testAuto.thursdayCheck).toBeChecked();
        await expect(testAuto.fridayCheck).toBeChecked();
        await expect(testAuto.saturdayCheck).toBeChecked();
        logger.info("CheckBox Validation completed successfully");
        //DropDown Validaiton.
        await testAuto.dropDown();
        await expect(testAuto.selectDropDown).toHaveValue("india");
        await expect(testAuto.unsortDropdown).toHaveValue("yellow");
        await expect(testAuto.sortDropdown).toHaveValue("zebra");
        logger.info("DropDown Validation completed successfully");
        //DatePicker Validation.
        await testAuto.datePicker();
        await expect(testAuto.txtpick).toHaveValue("11/03/2026");
        logger.info("DatePicker Validation completed successfully");
        // Custom Date picker Validation
        await testAuto.customDate()
        await expect(testAuto.custom).toHaveValue("03/08/2024");
        logger.info("Custom DatePicker Validation completed successfully");
        // Date Range Validation
        await testAuto.daterange();
        await expect(page.locator("#result")).toHaveText("You selected a range of 731 days.");
        logger.info("Date Range Validation completed successfully");
    })
    test("Upload Validation", async ({ page }) => {
        await testAuto.uploadFile();
        await expect(page.locator("#singleFileStatus")).toContainText("1793179086626");
        logger.info("Upload Validation completed successfully");

    })
    test("double Click", async ({ page }) => {
        await testAuto.doubleClick();
        expect(testAuto.field2).toHaveValue("Hello World!");
        logger.info("Double Click validation completed successfully");
    });
    test("Alert Validaiton", async ({ page }) => {
        const message = await testAuto.simpleAlert();
        expect(message).toBe("I am an alert box!");
        const message2 = await testAuto.confirmAlert();
        expect(message2).toBe("Press a button!");
        const promptMessage = await testAuto.promptAlert();
        expect(promptMessage).toBe("Hello darling! How are you today?");
        logger.info("Alert Validation completed successfully");

    })
    test("Window Handle Validaiton", async ({ page }) => {
        const url = await testAuto.windowHandle();
        expect(page.context().pages().length).toBe(2);
        await expect(url).toHaveURL("https://www.pavantestingtools.com/");
        await url.close();
        const pop = await testAuto.popupHandle();
        await expect(pop).toHaveURL["https://www.selenium.dev/", "https://playwright.dev/"];
        expect(page.context().pages().length).toBe(2);
        logger.info("Window Handle Validation completed successfully"); 

    })
    test("Static table handling ", async ({ page }) => {
        const book = await testAuto.staticTable();
        expect(book).toBeTruthy();
        logger.info("Static Table Validation completed successfully");  
    })
    test("Dynamic table handling", async ({ page }) => {

        const desktop = await testAuto.dynamicTable();
        expect(desktop).toBeTruthy();
        logger.info("Dynamic Table Validation completed successfully");

    })
    test("Drag and Drop Validation", async ({ page }) => {
        await testAuto.dragandDrop();
        const targetText = await testAuto.target.textContent();
        expect(targetText).toContain("Dropped!");
        logger.info("Drag and Drop Validation completed successfully");
    })
    test("Get Labels Text", async ({ page }) => {
        const labelsText = await testAuto.getLabelsText();
        expect(labelsText).toContain("Samsung");
        expect(labelsText).toContain("Real Me");
        expect(labelsText).toContain("Moto");
        logger.info("Get Labels Text Validation completed successfully");
    })
    test("Broken links Validation", async ({page,request})=>
    {
       const broken = await testAuto.checkBrokenLinks(request);
       console.log("Broken Links:" ,JSON.stringify(broken, null, 2));
       expect(broken).toHaveLength(9);
       logger.info("Broken Links Validation completed successfully");
    })
    test("point me button validation",async({page})=>{
        await testAuto.pointMe();
        logger.info("Point Me Button Validation completed successfully");
        logger.info("========Test Automation Suite Execution Ended=========");
    })
})