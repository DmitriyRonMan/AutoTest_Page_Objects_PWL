import {faker} from "@faker-js/faker";

export class UserBuilder {

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addPassword(symbol = 10) {
        this.userPassword = faker.internet.password({length: symbol});
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
            username: this.userName,
            password: this.userPassword,
            newPassword: this.newPassword,
        };
    }
}