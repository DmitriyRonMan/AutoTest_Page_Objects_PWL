import {test, expect} from '@playwright/test';
import {faker} from "@faker-js/faker";
import {MainPage} from "../src/pages/mainPages";
import {RegisterPage} from "../src/pages/registerPage";
import {YourfeedPage} from "../src/pages/yourfeedPage";
import{LoginPage} from "../src/pages/loginPage";
import {SettingPage} from "../src/pages/settingPage";

const URL = 'https://realworld.qa.guru/';

    test('Пользователь может изменить пароль и залогиниться с новым паролем)', async ({page,}) => {
        const user = {
            username: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        console.log(`${user.username}\n${user.email}\n${user.password}`);
        const userNewData ={
            username: user.username,
            email: user.email,
            password: faker.internet.password()
        }
        console.log(userNewData);/// новые данные пользователя
        const mainPage = new MainPage (page);
        const registerPage = new RegisterPage(page);
        const yourFeedPage = new YourfeedPage(page);
        const settingPage = new SettingPage(page);
        const loginPage    = new LoginPage(page);
        await mainPage.open(URL);
        await mainPage.goToRegister()
        await registerPage.register(user.username, user.email, user.password);
        await expect(yourFeedPage.profileNameField).toBeVisible();
        await expect(yourFeedPage.profileNameField).toContainText(user.username);
        await yourFeedPage.goToSetting(user.username);
        await settingPage.goToUpdatePassword(userNewData.password);//меняем пароль
        await expect (settingPage.updateSetButton).not.toBeVisible();// кнопка  изменения становится недоступной
        await yourFeedPage.goToOut(userNewData.username);/// выход
        await mainPage.goToLogin();
        await loginPage.login(userNewData.email,userNewData.password);
        await expect(yourFeedPage.profileNameField).toBeVisible();
        await expect(yourFeedPage.profileNameField).toContainText(userNewData.username);
});