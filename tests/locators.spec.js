import { test, expect } from "@playwright/test";
test.describe.configure({ mode: "serial" });
let page;
test.beforeAll("Opening the Web tables page", async ({ browser }) => {
  page = await browser.newPage();
  //Navigate to the URL.
  await page.goto("https://demoqa.com/webtables");
  // Validating the webpage.
  await expect(page).toHaveTitle("demosite");
  await expect(page).toHaveURL(/webtables/);
})
test("Validating the add button", async () => {
  // Click on add button.
  await page.getByRole('button', { name: "Add", exact: true }).click();
  //Enter value in the first Name field. 
  await page.getByPlaceholder("First Name").fill("Raja");
  // Vallidating first name field.
  await expect(page.getByPlaceholder("First Name")).toHaveValue("Raja");
  // Enter value in lastname field.
  await page.locator("#lastName").fill("RaviVarma");
  // Validating the  second name field
  await expect(page.locator("#lastName")).toHaveValue("RaviVarma");
  //enter the value in email field.
  await page.getByPlaceholder("name@example.com").fill("RajaRaviVarma@gmail.com");
  // Validating the email field.
  await expect(page.getByPlaceholder("name@example.com")).toHaveValue("RajaRaviVarma@gmail.com");
  // enter the value in age field
  await page.getByRole("textbox", { name: "age" }).fill("58");
  // validating the age field
  await expect(page.getByRole("textbox", { name: "age" })).toHaveValue('58');
  //enter the value in the salary field.
  await page.locator("//input[@id='salary']").fill("50000");
  // Validating the value in the salary field.
  await expect(page.locator("//input[@id='salary']")).toHaveValue("50000");
  //Enter the value in the dept field.
  await page.locator("//input[@id ='department']").fill("Quality Analyst");
  //Validating the dept field
  await expect(page.locator("//input[@id ='department']")).toHaveValue("Quality Analyst");
  // Click on the submit button
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  // Validate added record
  await expect(page.getByRole("cell", { name: "Raja", exact: true })).toHaveText("Raja");
});
test("Validating search", async () => {
  // webelement for search field
  const search = await page.locator("#searchBox");
  // to click on search field.
  await search.click();
  // to entervalue in search field.
  await search.fill("Raja");
  //validating the added record.
  await expect(page.getByRole("cell", { name: "Raja", exact: true })).toHaveText("Raja");

})
test("Validating the edit record", async () => {
  //Click on edit button.
  await page.getByTitle("Edit").click();
  // enter the value in age field
  const newage = await page.getByRole("textbox", { name: "age" });
  //to get actual age value.
  const actualage = await newage.inputValue();
  console.log("Age Value Before Editing : " + actualage);
  // enter new age value
  await newage.fill("98");
  //  to get edited age value.
  const expectedage = await newage.inputValue();
  // Click on the submit button
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  console.log(" Age Value After Editing :" + expectedage);
  // validating age field.
  await expect(actualage).not.toBe(expectedage);
})
test("Validating the delete button", async () => {
  //Click on Delete button.
  await page.getByTitle("Delete").click();
  // webelement for search field
  const search = await page.locator("#searchBox");
  // to click on search field.
  await search.click();
  // to entervalue in search field.
  await search.fill("Raja");
  //validating the Deleted Record.
  await expect(page.getByRole("cell", { name: "Raja", exact: true })).toHaveCount(0);
})
test.afterAll("closing all tabs", async () => {
  await page.close();
})
