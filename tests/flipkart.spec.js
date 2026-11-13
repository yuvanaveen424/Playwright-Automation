import {test, expect}  from "@playwright/test";
test("addcart validation",  async ({page})=>
{
    await page.goto("https://www.flipkart.com/");
    await page.locator("//span[@role ='button']").click();
    const search =  page.getByRole('textbox', { name: 'Search for Products, Brands' })
    await search.fill("trolley bag");
    await search.press("Enter");
    const products = page.locator("//*[@id='container']/div/div[3]/div[1]/div[2]/div[2]/div/div[2]/div/a/div[1]/div/div/div/img"); 
    await products.click();
    //await products.first().waitFor({ state: "visible" });
    const add = page .locator("//div [text() ='Go to cart']");
    await  add.click();
    // const count = await products.count();
    // console.log("Total products:", count);
    // const productNames = await products.allTextContents();
    // for (let i = 0; i < productNames.length; i++) {
    //     console.log(`${i + 1}. ${productNames[i]}`);
    // }
    // //await page.locator("//div[@class='_4rR01T']").first().click();
    await page.pause();

})