import {test, expect} from '@playwright/test';
import {faker} from "@faker-js/faker";
import {MainPage} from "../src/pages/mainPages";
import {RegisterPage} from "../src/pages/registerPage";
import {YourfeedPage} from "../src/pages/yourfeedPage";

const URL = 'https://realworld.qa.guru/';
const Text = (number) => {
    return faker.lorem.words(number);
};

test.describe('Шаблон', () => {

    test.beforeEach(async ({page}) => {
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
        await page.getByPlaceholder('Article Title').click();
        await page.getByPlaceholder('Article Title').fill(Text(5));
        await page.getByPlaceholder('What\'s this article about?').click();
        await page.getByPlaceholder('What\'s this article about?').fill(Text(10));
        await page.getByPlaceholder('Write your article (in markdown)').click();
        await page.getByPlaceholder('Write your article (in markdown)').fill(Text(15));
        await page.getByPlaceholder('Enter tags').click();
        await page.getByPlaceholder('Enter tags').fill(Text(3));
        await page.getByRole('button', {name: 'Publish Article'}).click();
        await expect(page.getByRole('button', {name: 'Post Comment'})).toBeVisible();
    });

    test('Пользователь может оставить комментарий к своей статье', async ({page,}) => {
        const yourfeedPage = new YourfeedPage(page);
        await yourfeedPage.goToArticle();
        await expect(yourfeedPage.profileNameField).toBeVisible();
        await page.getByPlaceholder('Article Title').click();
        await page.getByPlaceholder('Article Title').fill(Text(5));
        await page.getByPlaceholder('What\'s this article about?').click();
        await page.getByPlaceholder('What\'s this article about?').fill(Text(10));
        await page.getByPlaceholder('Write your article (in markdown)').click();
        await page.getByPlaceholder('Write your article (in markdown)').fill(Text(15));
        await page.getByPlaceholder('Enter tags').click();
        await page.getByPlaceholder('Enter tags').fill(Text(3));
        await page.getByRole('button', {name: 'Publish Article'}).click();
        await expect(page.getByRole('button', {name: 'Post Comment'})).toBeVisible();
        await page.getByPlaceholder('Write a comment...').click();
        await page.getByPlaceholder('Write a comment...').fill("Отличная статья!");
        await page.getByRole('button', {name: 'Post Comment'}).click();
        await expect(page.locator('.card-text')).toContainText("Отличная статья!");
    });
});

