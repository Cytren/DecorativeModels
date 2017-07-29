
import testAny from "../type/test-any";
import testBoolean from "../type/test-boolean";
import testInteger from "../type/test-integer";
import testFloat from "../type/test-float";
import testString from "../type/test-string";

export default function() {
    testAny();
    testBoolean();
    testInteger();
    testFloat();
    testString();
}