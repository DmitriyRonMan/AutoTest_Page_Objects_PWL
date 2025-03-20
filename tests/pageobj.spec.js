import { test, expect } from '@playwright/test';
import {MainPage, RegisterPage, YourfeedPage} from "../src/pages/index";
import {UserBuilder} from "../src/helpers/builder/index";

test.use({ storageState: { cookies: [], origins: [] } });
test('Регистрация нового пользователя', async ({page,}) => {
    test.slow();
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const yourfeedPage = new YourfeedPage(page);
    const userBuilder = new UserBuilder()
        .addEmail()
        .addUsername()
        .addPassword()
        .generate();
    await mainPage.open();
    await mainPage.goToRegister();
    await registerPage.getRegistration(userBuilder.username, userBuilder.email, userBuilder.password);
    await test.step('Имя пользователя отображается в профиле', async () => {
        await expect(yourfeedPage.profileNameField).toBeVisible();
        await expect(yourfeedPage.profileNameField).toContainText(userBuilder.username)
    });
});

