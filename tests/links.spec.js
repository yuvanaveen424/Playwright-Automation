import {test,expect} from "@playwright/test";
test.beforeEach(" Opening link webpage", async({page}) =>
{
    await page.goto("https://demoqa.com/links");
});
test("Validating homepage Links", async ({page})=>
{
    // await page.waitForSelector("a");
    // const links = await  page.$$("a");
    // for (const link of links)
    // {
    //     const linktext = await link.textContent();
    //     console.log(linktext);

    // }
    const linkPromise = page.waitForEvent("popup");
    await page.getByRole('link',{name:"Home",exact:true}).click();
    const newpage = await linkPromise;
    const newpageurl = await newpage.url();
    console.log(newpageurl);
})
test("Validating DynamicPage links", async({page}) =>
{
    const linkPromise =  page.waitForEvent("popup");
    await page.getBY
});