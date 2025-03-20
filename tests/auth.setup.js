import {test as setup, expect, test} from '@playwright/test';
import { LoginPage, MainPage, YourfeedPage } from '../src/pages/index';
import path from 'path';
// todo вынести в отдельное место
const URL_UI = 'https://realworld.qa.guru/';

//todo
const userFile = 'playwright/.auth/userFile.json';

test('Это новый тест', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const yourfeedPage = new YourfeedPage(page);
    await mainPage.open(URL_UI);
    await mainPage.goToLogin();
    //todo спрятать учетку
    await loginPage.getAuthorization('gefor24759@shouxs.com', '12345');
    await expect(yourfeedPage.profileNameField).toContainText('demo');
    await page.context().storageState({ path: userFile });
});