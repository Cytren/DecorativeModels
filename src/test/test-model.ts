
import {assert, expect} from "chai";
import {validate, type} from "../main/index";

describe("Simple Model", () => {
    class User {
        @type("integer") id: number;
        @type("string") firstName: string;
        @type("string") lastName: string;
    }

    it("Should NOT validate an empty User instance", () => {
        let user = new User();
        assert(!validate(user));
    });

    it("Should validate a populated User instance", () => {
        let user = new User();
        user.id = 123456789;
        user.firstName = "FIRST NAME";
        user.lastName = "LAST NAME";

        assert(validate(user));
    });

    it("Should NOT validate an empty Object instance", () => {
        let user = {};
        assert(!validate(user, "User"));
    });

    it("Should validate a populated Object instance", () => {
        let user = {
            id: 123456789,
            firstName: "FIRST NAME",
            lastName: "LAST NAME"
        };

        assert(validate(user, "User"));
    });

    it("Should NOT validate a populated Object instance without an explicit type", () => {
        let user = {
            id: 123456789,
            firstName: "FIRST NAME",
            lastName: "LAST NAME"
        };

        expect(() => {
            validate(user)
        }).to.throw("The model Object does not exist");
    });
});