import {test} from '@playwright/test';

export class ArticleCreatPage {
    constructor(page) {
        this.page = page;

        this.articleTitleField = page.getByPlaceholder('Article Title');
        this.articleDescriptionField = page.getByPlaceholder('What\'s this article about?');
        this.articleTextField = page.getByPlaceholder('Write your article (in markdown)');
        this.articleTagsField = page.getByPlaceholder('Enter tags');
        this.publishArticleButton = page.getByRole('button', {name: 'Publish Article'});

    }
    async articleCreation(title, description, text, tags) {
        await test.step('Добавить статью', async () => {
            await this.articleTitleField.click();
            await this.articleTitleField.fill(title);
            await this.articleDescriptionField.click();
            await this.articleDescriptionField.fill(description);
            await this.articleTextField.click();
            await this.articleTextField.fill(text);
            await this.articleTagsField.click();
            await this.articleTagsField.fill(tags);
            await this.publishArticleButton.click();
        });
    }
}