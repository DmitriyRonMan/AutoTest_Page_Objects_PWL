export class SettingPage {
    constructor(page) {
        this.page = page;

        this.passwordField = page.getByPlaceholder('Password');
        this.updateSetButton = page.getByRole('button', { name: 'Update Settings' });
    }
    async goToUpdatePassword(newPassword) {

        await this.passwordField.click();
        await this.passwordField.fill(newPassword);
        await this.updateSetButton.click();
    }
}