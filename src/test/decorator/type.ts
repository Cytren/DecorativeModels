
import testAny from "../type/any";
import testBoolean from "../type/boolean";
import testInteger from "../type/integer";
import testFloat from "../type/float";
import testCharacter from "../type/character";
import testString from "../type/string";
import testModel from "../type/model";
import testArray from "../type/array";
import testSet from "../type/set";
import testMap from "../type/map";
import testCollection from "../type/collection";

export default function() {
    testAny();
    testBoolean();
    testInteger();
    testFloat();
    testCharacter();
    testString();
    testModel();
    testArray();
    testSet();
    testMap();
    testCollection();
}