import {expect, test as base} from '@playwright/test';
import {LoginPage, MainPage, YourfeedPage} from "../../pages/index";
import {UserBuilder} from "../builder/index";

export const test = base.extend({


    loginUser1: async ({page}, use) => {
        /*test.slow();*/
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
        await use(page);
    },
});