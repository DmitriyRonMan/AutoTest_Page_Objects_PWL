import {test, expect} from '@playwright/test';
import {faker} from "@faker-js/faker";
import {MainPage, RegisterPage, YourfeedPage, ArticleCreatPage, CommentPostPage} from "../src/pages/index";
import {UserBuilder} from "../src/helpers/builder";

const Text = (number) => {
    return faker.lorem.words(number);
};
test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Тесты по статьям', () => {
    test.slow();
    test.beforeEach(async ({page}) => {
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
            await expect(yourfeedPage.profileNameField).toContainText(userBuilder.username);
        });
    });

    test('Добавить статью', async ({page,}) => {
        const yourfeedPage = new YourfeedPage(page);
        const articlecreatePage = new ArticleCreatPage(page);
        const commentpostPage = new CommentPostPage(page);

        await yourfeedPage.goToArticle();
        await test.step('Открыта страница создания статьи', async () => {
            await expect(yourfeedPage.profileNameField).toBeVisible();
        });
        await articlecreatePage.articleCreation(Text(5), Text(10), Text(15), Text(3));
        await commentpostPage.seeCommentButton();
    });

    test('Пользователь может оставить комментарий к своей статье', async ({page,}) => {
        const yourfeedPage = new YourfeedPage(page);
        const articlecreatePage = new ArticleCreatPage(page);
        const commentpostPage = new CommentPostPage(page);
        await yourfeedPage.goToArticle();
        await test.step('Открыта страница создания статьи', async () => {
            await expect(yourfeedPage.profileNameField).toBeVisible();
        });
        await articlecreatePage.articleCreation(Text(5), Text(10), Text(15), Text(3));
        await commentpostPage.seeCommentButton();
        await commentpostPage.postComment();

    });
});

