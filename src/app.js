function validate(validatableInput) {
    var isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    return isValid;
}
// Autobind Decorator
// function autobind(
//     _: any, 
//     _2: string, 
//     descriptor: TypedPropertyDescriptor<any>
//     ) { 
//     const originalMethod = descriptor.value;
//     const adjDescriptor: PropertyDescriptor = {
//         configurable: true,
//         get(){
//             const boundFn = originalMethod.bind(this);
//             return boundFn;
//         }
//     };
//     return adjDescriptor;
// }
// ProjectList Class 
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = this.type + "-projects";
        this.attach();
        this.renderContent();
    }
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-project-list";
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    };
    ProjectList.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    };
    return ProjectList;
}());
// Project Input Class- Object oreinted approach
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        var peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1
        };
        // Validation
        if (
        // enteredTitle.trim().length === 0 || 
        // enteredDescription.trim().length === 0 || 
        // enteredPeople.trim().length === 0
        !validate(titleValidatable) &&
            !validate(descriptionValidatable) &&
            !validate(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    };
    // Error here for experimental decorators
    // @autobind
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        // console.log(this.titleInputElement.value);
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            console.log(title, desc, people);
            this.clearInputs();
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    return ProjectInput;
}());
var prjInput = new ProjectInput();
var activePrjList = new ProjectList('active');
var finishedPrjList = new ProjectList('finished');
