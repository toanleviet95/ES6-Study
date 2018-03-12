/* Examples about difference between ES5 Prototype and ES6 Class */

// ES5 version

/* We have defined two read-only own properties and 
a custom toString method on the constructor function */

function Animal (name, fierce) {
    Object.defineProperty(this, 'name', {
        get: function() { return name; }
    });

    Object.defineProperty(this, 'fierce', {
        get: function() { return fierce; }
    });

    // Or
    // this.fierce = fierce;
    // this.name = name;


    this.toString = function() {
        return 'A' + ' ' + (this.fierce ? 'fierce' : 'tame') + ' ' +this.name;
    }
}

// Or
Animal.prototype.toString() = function() {
    return 'A' + ' ' + (this.fierce ? 'fierce' : 'tame') + ' ' +this.name;
}

var Lion = new Animal('Lion', true);
console.log(Lion.toString()); // "A fierce Lion"

// ES5 Inheritance use Object.create
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.getFullname = function() {
        return this.firstName + ' ' + this.lastName;
    }
}

function Student(studentId, firstName, lastName) {
    // Call constructor of parent
    Person.call(this, firstName, lastName);
    
    this.studentId = studentId;
    this.getStudentInfo = function() {
        return this.studentId + ': ' + this.firstName + ' ' + this.lastName;
    }
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;



// ES6 version

class Animal {
    // there can only be one constructor method
    constructor(name, fierce) {
        this._name = name;
        this._fierce = fierce;
    }

    get name() {
        return this._name;
    }

    get fierce() {
        return this._fierce;
    }

    // Prototype method
    toString() {
        return `A ${this._fierce ? 'fierce' : 'tame'} ${this._name}`;
    }

    // Static method
    static sleep() {
        return `ZZZZZzzzzz`;
    }
}

let Lion = new Animal('Lion', true);

console.log(Lion.fierce); 

console.log(Lion.toString());

Animal.sleep();

// ES6 Inheritance
class Felidae extends Animal {
    constructor(name, fierce, family) {
        super(name, fierce);
        this._family = family;
    }

    family() {
        return `A ${this._name} is an animal of the ${this._family} subfamily under the ${Felidae.name} family`;
    }
}

let Tiger = new Felidae('Tiger', true, 'Pantherinae');

console.log(Tiger.toString()); // "This is a fierce Tiger"

console.log(Tiger.family()); // "A Tiger is an animal of the Pantherinae subfamily under the Felidae family"