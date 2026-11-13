import {test,expect} from '@playwright/test';
import logger from "../logs/logger";
test("frames Validation",async({page})=>
{
    logger.info("Frames Validation started");
    await page.goto("https://demoqa.com/frames");
    const frame1= page.frameLocator('#frame1');
    const frame2 = page.frameLocator("#frame2");
    await expect(frame1.locator("#sampleHeading")).toContainText("This is a sample page");
    await expect(frame2.locator("#sampleHeading")).toContainText("This is a sample page");
    logger.info("Frames Validation completed successfully");
    
})