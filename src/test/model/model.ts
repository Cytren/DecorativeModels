
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function() {
    class Model {
        @type("integer") id: number;
        @type("string") name: string;
    }

    it("should NOT validate an empty model instance", () => {
        let model = new Model();
        validate(model).then(error => assert.isNotNull(error)).catch(() => {});
    });

    it("should validate a populated model instance", () => {
        let model = new Model();
        model.id = 123456789;
        model.name = "NAME";

        validate(model).then(error => assert.isNull(error)).catch(() => {});
    });

    it("should NOT validate an empty object instance", () => {
        let model = {};
        validate(model, Model).then(error => assert.isNotNull(error)).catch(() => {});
    });

    it("should validate a populated object instance", () => {
        let model = {
            id: 123456789,
            name: "NAME"
        };

        validate(model, Model).then(error => assert.isNull(error)).catch(() => {});
    });

    it("should NOT validate a populated object instance without an explicit type", () => {
        let model = {
            id: 123456789,
            name: "NAME"
        };

        validate(model).then(() => {}).catch(error => {
            assert.equal(error.message, "The model Object does not exist");
        });
    });
}