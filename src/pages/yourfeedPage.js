export class YourfeedPage {
    constructor(page) {
        this.page = page;
        this.logoutButton      = page.getByRole('link', { name: 'Logout' });
        this.newArticleButton = page.getByRole('link', {name: 'New Article'});
        this.profileNameField = page.getByRole('navigation');
        this.settingButton    = page.getByRole('link', { name: 'Settings' });

    }
    async goToArticle() {
        await this.newArticleButton.click();
    }
    async goToOut(user) {
        await  this.profileNameField.getByText(user).click();
        await this.logoutButton.click();
    }

    async goToSetting(user) {
        await  this.profileNameField.getByText(user).click();
        await this.settingButton.click();
    }
}