class Track {
    token: string;
    currentHint: string;

    constructor(token: string) {
        this.token = token;
        this.currentHint = "Hint 1";
    }

    getCurrentHint() {
        return this.currentHint;
    }
}