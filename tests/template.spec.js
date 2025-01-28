import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker";
import {MainPage} from "../src/pages/mainPages";
import {RegisterPage} from "../src/pages/registerPage";
import {YourfeedPage} from "../src/pages/yourfeedPage";

const URL = 'https://realworld.qa.guru/';

test.describe('Шаблон', () => {

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const yourfeedPage = new YourfeedPage(page);
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password({length: 10}),
            username: faker.person.firstName(),
        };
        await mainPage.open(URL);
        await mainPage.goToRegister();
        await registerPage.register(user.username, user.email, user.password);
        await expect(yourfeedPage.profileNameField).toBeVisible();
        await expect(yourfeedPage.profileNameField).toContainText(user.username);
    });

    test('Добавить статью', async ({page,}) => {
        const yourfeedPage = new YourfeedPage(page);
        await yourfeedPage.goToArticle();
        await expect(yourfeedPage.profileNameField).toBeVisible();

    });
});
