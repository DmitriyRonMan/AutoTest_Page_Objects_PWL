import {expect} from '@playwright/test';
import {test} from "../src/helpers/fixture/index";
import {YourfeedPage} from "../src/pages/index";

test('Перейти на страницу создания статьи', async ({page}) => {
    const yourfeedPage = new YourfeedPage(page);

    await yourfeedPage.goToArticle();
    await test.step('Открыта страница создания статьи', async () => {
        await expect(yourfeedPage.profileNameField).toBeVisible();
    });
});

//Тест с фикстурой авторизации пользователя (работает, если из проекта убрать storage)
/*
test('Перейти на страницу создания статьи', async ({loginUser1}) => {
    const yourfeedPage = new YourfeedPage(loginUser1);

    await yourfeedPage.goToArticle();
    await test.step('Открыта страница создания статьи', async () => {
        await expect(yourfeedPage.profileNameField).toBeVisible();
    });
});*/
