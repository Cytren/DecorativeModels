# Decorative Models
Decorative models is an easy to use runtime model validation library for TypeScript.
It is most useful for validating client requests in node for model conformity, but
can be used for any runtime validation.

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
 
if (validate(user)) {
    console.log("Valid!");
} else {
    console.log("Invalid!");
}
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

#####```strictMode: boolean```  
```true```: properties are NOT allowed to be null, unless decorated with @nullable  
```false```: properties are allowed to be null, unless decorated with @required

#####```allowUndecorated: boolean```
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
class MyModel {
    @type("string")
    primitive: string;
    
    @type("AnotherModel")
    model: AnotherModel;
    
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
The ```validate()``` function has many signatures to allow for more control over
the validation process.

### Result
The result of the validation can be handled by the returned
boolean, or for more information about potential validation errors, a processor
function can be passed in.

##### Boolean Result
```
if (validate(myModel)) {
    console.log("It Validated!");
} else {
    console.log("Error Validating!");
}
```

##### Function Result
```
validate(myModel, (error) => {
    if (!error) {
        console.log("It Validated!");
    } else {
        console.log(`Error Validating!`);
        console.log(`${error.modelName}.${error.propertyName}`);
        console.log(error.errorMessage);
    }
});
```

### Batch Validation
The validate function supports batch model validations, simply pass in an array
of the models you want to validate.

```
validate([model1, model2]);
```
OR
```
validate([model1, model2], (error) => {});
```

### Conformity Validation
Any object can be validated for model conformity, not only true instances of the
class. When validating another object, the name of the model must be given in order
to know which model to validate against.

```
class MyModel {
    @type("string")
    value: string;
}
 
let model1 = new MyModel();
model1.value = "STRING";
 
let model2 = {
    value: "STRING"
};
 
console.log(validate(model1));              // true
console.log(validate(model2, "MyModel"));   // true
```

One important thing to note however, is that in order for the conformity validation
to register, at least one instance of the class must be created. In this case, if the
model1 instance had not have been created first, the model2 validation would fail.