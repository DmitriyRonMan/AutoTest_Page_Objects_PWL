export class MainPage {
    constructor(page) {
        this.page = page;
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
    }
    async goToRegister() {
        await this.signUpButton.click();
    }
    async open(url) {
        await this.page.goto(url);
    }
}