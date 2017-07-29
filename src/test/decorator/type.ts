
import testAny from "../type/any";
import testBoolean from "../type/boolean";
import testInteger from "../type/integer";
import testFloat from "../type/float";
import testString from "../type/string";
import testModel from "../type/model";
import testArray from "../type/array";
import testSet from "../type/set";

export default function() {
    testAny();
    testBoolean();
    testInteger();
    testFloat();
    testString();
    testModel();
    testArray();
    testSet();
}