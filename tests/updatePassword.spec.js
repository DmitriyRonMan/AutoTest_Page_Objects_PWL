import {test, expect} from '@playwright/test';
import {MainPage, RegisterPage, YourfeedPage, LoginPage, SettingPage} from "../src/pages/index";
import {UserBuilder} from "../src/helpers/builder";

test.use({ storageState: { cookies: [], origins: [] } });
    test('Пользователь может изменить пароль и залогиниться с новым паролем)', async ({page,}) => {
        test.slow();
        const mainPage = new MainPage (page);
        const registerPage = new RegisterPage(page);
        const yourFeedPage = new YourfeedPage(page);
        const settingPage = new SettingPage(page);
        const loginPage    = new LoginPage(page);
        const userBuilder = new UserBuilder()
            .addEmail()
            .addUsername()
            .addPassword()
            .addNewPassword()
            .generate();
        await mainPage.open();
        await mainPage.goToRegister()
        await registerPage.getRegistration(userBuilder.username, userBuilder.email, userBuilder.password);
        await test.step('Имя пользователя отображается в профиле', async () => {
            await expect(yourFeedPage.profileNameField).toBeVisible();
            await expect(yourFeedPage.profileNameField).toContainText(userBuilder.username)
        });
        await yourFeedPage.goToSetting(userBuilder.username);
        await settingPage.goToUpdatePassword(userBuilder.newPassword);
        await test.step('Кнопка "Обновить данные" не отображается', async () => {
            await expect (settingPage.updateSetButton).not.toBeVisible();
        });
        await yourFeedPage.goToOut(userBuilder.username);
        await mainPage.goToLogin();
        await loginPage.getAuthorization(userBuilder.email,userBuilder.newPassword);
        await test.step('Имя пользователя отображается в профиле', async () => {
            await expect(yourFeedPage.profileNameField).toBeVisible();
            await expect(yourFeedPage.profileNameField).toContainText(userBuilder.username);
        });
});