export class UserCreatedAt {
    value: Date;

    constructor(value: Date) {
        this.value = value;
        this.ensureIsValid();
    }

    // sevices of domain
    private ensureIsValid() {
        if (this.value > new Date()) {
            throw new Error('UserCreatedAt must be in the past');
        }
    }

}