import {test} from '@playwright/test';

export class MainPage {
    constructor(page) {
        this.page = page;
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: 'Login' });
    }
    async goToRegister() {
        await test.step('Перейти на страницу регистрации', async () => {
            await this.signUpButton.click();
        });
    }
    async goToLogin() {
        await test.step('Перейти на страницу авторизации', async () => {
            await this.loginButton.click();
        });
    }
    async open(url = 'https://realworld.qa.guru/') {
        await test.step('Открыть сайт', async () => {
            await this.page.goto(url);
        });
    }
}