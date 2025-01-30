export class MainPage {
    constructor(page) {
        this.page = page;
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: 'Login' });
    }
    async goToRegister() {
        await this.signUpButton.click();
    }
    async goToLogin() {
        await this.loginButton.click();
    }
    async open(url) {
        await this.page.goto(url);
    }
}