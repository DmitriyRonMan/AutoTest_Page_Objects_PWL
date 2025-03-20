import {test} from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.loginButton = page.getByRole('button', { name: 'Login' });

        this.emailField = page.getByPlaceholder('Email');
        this.passwordField = page.getByPlaceholder('Password');

    }
    async getAuthorization(email, password) {
        await test.step('Авторизоваться', async () => {
            await this.emailField.click();
            await this.emailField.fill(email);
            await this.passwordField.click();
            await this.passwordField.fill(password);
            await this.loginButton.click();
        });
    }
}