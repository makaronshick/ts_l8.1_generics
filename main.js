//Завдання #1: Дискримінантне об'єднання з узагальненням
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function handleResult(status, result) {
    if (isSuccessResult(result)) {
        return result.data;
    }
    else {
        throw new Error(result.error);
    }
}
function isSuccessResult(result) {
    return typeof result === 'object' && result !== null && 'data' in result;
}
var successResult = { data: 'Operation completed' };
var errorResult = { error: 'Something went wrong' };
console.log(handleResult('success', successResult)); // "Operation completed"
//handleResult('error', errorResult);                  // Error: Something went wrong
//-----------------------------------------------------------------
//Завдання #2: Узагальнена черга
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    Queue.prototype.peek = function () {
        return this.items[0];
    };
    Queue.prototype.size = function () {
        return this.items.length;
    };
    return Queue;
}());
var queueNum = new Queue();
queueNum.enqueue(42);
queueNum.enqueue(777);
console.log(queueNum.peek()); // 42
console.log(queueNum.size()); // 2
console.log(queueNum.dequeue()); // 42
console.log(queueNum.size()); // 1
var queueStr = new Queue();
queueStr.enqueue('hi');
queueStr.enqueue('privet');
console.log(queueStr.peek()); // hi
console.log(queueStr.size()); // 2
console.log(queueStr.dequeue()); // hi
console.log(queueStr.size()); // 1
//-----------------------------------------------------------------
//Завдання #3: Узагальнена функція сортування
function sortArray(arr, compareFn) {
    return __spreadArray([], arr, true).sort(compareFn);
}
var numbers = [5, 2, 9, 3];
var sortedNumbers = sortArray(numbers, function (a, b) { return a - b; });
console.log(sortedNumbers); // [2, 3, 5, 9]
var strings = ['banana', 'apple', 'cherry'];
var sortedStrings = sortArray(strings, function (a, b) { return a.localeCompare(b); });
console.log(sortedStrings); // ["apple", "banana", "cherry"]
//-----------------------------------------------------------------
//Завдання #4: Узагальнені обмеження
function extractProperty(obj, key) {
    return obj[key];
}
var user = { id: 1, name: 'Alice', age: 30 };
console.log(extractProperty(user, 'name')); // Alice
console.log(extractProperty(user, 'age')); // 30
//console.log(extractProperty(user, 'ololo')); // TS error
var student = { id: 2, course: 'History', group: 'Blink-182' };
console.log(extractProperty(student, 'course')); // History
console.log(extractProperty(student, 'group')); // Blink-182
var Repository = /** @class */ (function () {
    function Repository() {
        this.items = [];
    }
    Repository.prototype.add = function (item) {
        if (this.items.some(function (existing) { return existing.id === item.id; })) {
            throw new Error("Item with id ".concat(item.id, " already exists."));
        }
        this.items.push(item);
    };
    Repository.prototype.getById = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    Repository.prototype.removeById = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    };
    Repository.prototype.getAll = function () {
        return __spreadArray([], this.items, true);
    };
    return Repository;
}());
var userRepository = new Repository();
userRepository.add({ id: 1, name: 'Alice', email: 'alice@example.com' });
userRepository.add({ id: 2, name: 'Bob', email: 'bob@example.com' });
console.log(userRepository.getAll()); // [{ id: 1, name: 'Alice', email: 'alice@example.com' }, { id: 2, name: 'Bob', email: 'bob@example.com' }]
console.log(userRepository.getById(1)); // { id: 1, name: 'Alice', email: 'alice@example.com' }
console.log(userRepository.removeById(1)); // true
console.log(userRepository.removeById(8)); // false
console.log(userRepository.getAll()); // [{ id: 2, name: 'Bob', email: 'bob@example.com' }]
var productRepository = new Repository();
productRepository.add({ id: 1, title: 'Laptop', price: 1200 });
productRepository.add({ id: 2, title: 'Phone', price: 800 });
console.log(productRepository.getAll()); // [{ id: 1, title: 'Laptop', price: 1200 }, { id: 2, title: 'Phone', price: 800 }]
console.log(productRepository.getById(1)); // { id: 1, title: 'Laptop', price: 1200 }
console.log(productRepository.removeById(1)); // true
console.log(productRepository.removeById(8)); // false
console.log(productRepository.getAll()); // [{ id: 2, title: 'Phone', price: 800 }]
