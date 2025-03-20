import {test, expect} from "@playwright/test";

export class CommentPostPage {
    constructor(page) {
        this.page = page;

        this.commentField = page.getByPlaceholder('Write a comment...');
        this.postCommentButton = page.getByRole('button', {name: 'Post Comment'});
        this.commentForArticle = page.locator('.card-text');
    }
    async postComment() {
        await test.step('Оставить комментарий к своей статье', async () => {
            await this.commentField.click();
            await this.commentField.fill('Отличная статья!');
            await this.postCommentButton.click();
        });
        await test.step('Комментарий отображается у статьи', async () => {
            await expect(this.commentForArticle).toContainText('Отличная статья!');
        });
    }

    async seeCommentButton () {
        await test.step('Кнопка "Оставить комментарий" отображается', async () => {
            await expect(this.postCommentButton).toBeVisible();
        });
    }
}