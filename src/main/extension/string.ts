
declare global {
    interface String {
        isAlphanumeric(): boolean;
    }
}

String.prototype.isAlphanumeric = function(this: string) {
    for (let i = 0; i < this.length; i++) {
        let code = this.charCodeAt(i);

        if (code < 48) { return false; }
        if (code > 57 && code < 65) { return false; }
        if (code > 90 && code < 97) { return false; }
        if (code > 122) { return false; }
    }

    return true;
};

export = {};