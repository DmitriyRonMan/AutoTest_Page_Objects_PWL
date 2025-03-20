import {test, expect} from '@playwright/test';
import {YourfeedPage, ArticleCreatPage, CommentPostPage} from "../src/pages/index";

test('Перейти на страницу создания статьи', async ({page,}) => {
    const yourfeedPage = new YourfeedPage(page);

    await yourfeedPage.goToArticle();
    await test.step('Открыта страница создания статьи', async () => {
        await expect(yourfeedPage.profileNameField).toBeVisible();
    });
});