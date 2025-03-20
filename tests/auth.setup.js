import {test as setup, expect} from '@playwright/test';
import { LoginPage, MainPage, YourfeedPage } from '../src/pages/index';
import {UserBuilder} from "../src/helpers/builder/index";
import path from 'path';

const userFile = 'playwright/.auth/userFile.json';

setup('Авторизация', async ({ page }) => {

    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const yourfeedPage = new YourfeedPage(page);
    const userBuilder = new UserBuilder()
        .addEmailAuth()
        .addPasswordAuth()
        .generate();
    await mainPage.open();
    await mainPage.goToLogin();
    await loginPage.getAuthorization(userBuilder.emailAuth, userBuilder.passwordAuth);
    await expect(yourfeedPage.profileNameField).toContainText('demo');
    await page.context().storageState({ path: userFile });
});