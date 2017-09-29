# Decorative Models
Decorative models is an easy to use runtime model validation library for TypeScript.
It is most useful for validating client requests in node for model conformity, but
can be used for any runtime validation.

## Installation
```
npm install --save decorative-models
```

## Example
```
import {type, length, validate} from "decorative-models";
 
class User {
    @type("string")
    @length(5, 20)
    name: string;
}
 
let user = new User();
user.name = "User Name";
 
validate(user).then(error => {
    console.log(error == null ? "Valid!" : "Invalid!");
});
```

## Process Options
To manage the way a model is validated, processing options can be used for extra control.
They can be set globally, or on an individual model basis.

```
let processOptions = {
    strictMode: false,
    allowUndecorated: false
};
```

##### ```strictMode: boolean```  
```true```: properties are NOT allowed to be null, unless decorated with @nullable  
```false```: properties are allowed to be null, unless decorated with @required

##### ```allowUndecorated: boolean```
Should a model validate with un-decorated properties?

### Setting on a Model
```
import {model} from "decorative-models";
 
@model(processOptions)
class MyModel {
   // properties 
}
```

### Setting Globally
```
import {options} from "decorative-models";
options(processOptions);
```

## Types
Properties can be bound to a primitive type, collection type or another model.

```
import YetAnotherModel from "./yet-another-model";
 
class MyModel {
    @type("string")
    primitive: string;
    
    @type("AnotherModel")
    model: AnotherModel;
    
    @type(YetAnotherModel)
    model: YetAnotherModel;
    
    @type("<AnotherModel>")
    collection: Set<AnotherModel>;
}
```

### Primitive Types
- ```any```
- ```string```
- ```character```
- ```integer```
- ```float```
- ```boolean```

### Collection Types
Collection types hold a "collection" of any of the other types, this includes models and
other collection types.

##### Array
```
@type("[string]")
stringArray: string[]
```

##### Set
```
@type("<MyModel>")
stringSet: Set<string>
```

##### Map
```
@type("(integer -> [MyModel])")
integerToModelArrayMap: Map<number, MyModel[]>
```

## Decorators
Many of the decorators can be used with each other, this assists in complex modelling.
Not all of the decorators are compatible with each other however.

##### type(propertyType: string)
The type the property should be bound to.
```
@type("string")
value: string;
```

##### count(min: number, max: number)
The number of items allowed in a collection.
```
@count(2, 5)
value: number[];
```

##### length(min: number, max: number)
The number of character allowed in a string.
```
@length(5, 10)
value: string;
```

##### range(min: number, max: number)
The range the number must fall into in order to validate (inclusive).
```
@range(4, 8)
value: number;
```

##### match(regexPattern: RegExp OR ...validStrings: string[])
Bound the string to match the regex pattern or one of the given strings.
```
@match(/[a-z]+/)
value1: string;
 
@match("one", "two", "three")
value2: string;
```

##### nullable
When in strict mode, allows the property be be null and still pass the validation.
```
@nullable
value: string;
```

##### required
When in non-strict mode, requires the property to NOT be null to pass the validation.
```
@required
value: string;
```

## Validation
The ```validate()``` function handles all validation of models, using promises to return the result. 
The promise is resolved even when the validation has failed. The only time the promise will be rejected,
is when either an internal error occurs, or incorrect data has been passed into the validation.

```
validate(myModel).then(error => {
    if (!error) {
        console.log("It Validated!");
    } else {
        console.log("Error Validating!");
        console.log(`${error.modelName}.${error.propertyName}`);
        console.log(error.errorMessage);
    }
});
```

### Batch Validation
The validate function supports batch model validations, simply pass in an array
of the models you want to validate.

```
validate([model1, model2], error => console.log(error));
```

### Conformity Validation
Any object can be validated for model conformity, not only true instances of the
class. When validating another object, the type of the model must be given in order
to know which model to validate against.

```
class MyModel {
    @type("string")
    value: string;
}
 
let modelOne = new MyModel();
model1.value = "STRING";
 
let modelTwo = {
    value: "STRING"
};
 
validate(modelOne).then(error => console.log(error));              // validates
validate(modelTwo, MyModel).then(error => console.log(error));     // validates
```

One important thing to note however, is that in order for the conformity validation
to register, at least one instance of the class must be created. In this case, if the
modelOne instance had not have been created first, the modelTwo validation would fail.

## Contribution
If you find Decorative Models useful and would like to contribute to the development,
then please read on.

### Development Environment
Setting up the development environment requires minimal effort. First, make sure you
have the latest version of node installed.

#### Downloading
```
git clone https://github.com/Cytren/DecorativeModels.git decorative-models
```

#### Installing Required Libraries
```
cd decorative-models
npm install
```

#### Running Tests
```
npm run test
```