import {test,expect} from '@playwright/test';
test("Sauce demo product validation", async ({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.locator("#login-button").click();
    const products = await page.locator("//div[@class='inventory_item']").allTextContents();
    console.log("products "+products.first());

})