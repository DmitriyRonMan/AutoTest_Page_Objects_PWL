import {faker} from "@faker-js/faker";

export class UserBuilder {

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addEmailAuth() {
        this.userEmailAuth = 'gefor24759@shouxs.com';
        return this;
    }

    addPassword(symbol = 10) {
        this.userPassword = faker.internet.password({length: symbol});
        return this;
    }
    addPasswordAuth() {
        this.userPasswordAuth = '12345';
        return this;
    }

    addUsername() {
        this.userName = faker.person.firstName();
        return this;
    }

    addNewPassword(symbol = 10) {
        this.newPassword = faker.internet.password({length: symbol});
        return this;
    }

    generate() {
        return {
            email: this.userEmail,
            emailAuth: this.userEmailAuth,
            username: this.userName,
            password: this.userPassword,
            newPassword: this.newPassword,
            passwordAuth: this.userPasswordAuth,
        };
    }
}