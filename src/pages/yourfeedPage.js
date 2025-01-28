export class YourfeedPage {
    constructor(page) {
        this.page = page;
        this.newArticleButton = page.getByRole('link', {name: 'New Article'});
        this.profileNameField = page.getByRole('navigation');
    }
    async goToArticle() {
        await this.newArticleButton.click();
    }
}