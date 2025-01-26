//Завдання #1: Дискримінантне об'єднання з узагальненням

type Status = 'success' | 'error';

interface IResult {
    success: { data: string };
    error: { error: string };
}

function handleResult<TStatus extends Status, TResult extends IResult[TStatus]>(status: TStatus, result: TResult): string | never {
    if (isSuccessResult(result)) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
}

function isSuccessResult(result: unknown): result is IResult['success'] {
  return typeof result === 'object' && result !== null && 'data' in result;
}

const successResult: IResult['success'] = { data: 'Operation completed' };
const errorResult: IResult['error'] = { error: 'Something went wrong' };

console.log(handleResult('success', successResult)); // "Operation completed"
//handleResult('error', errorResult);                  // Error: Something went wrong

//-----------------------------------------------------------------
//Завдання #2: Узагальнена черга

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }
}

const queueNum = new Queue<number>();
queueNum.enqueue(42);
queueNum.enqueue(777);
console.log(queueNum.peek());    // 42
console.log(queueNum.size());    // 2
console.log(queueNum.dequeue()); // 42
console.log(queueNum.size());    // 1

const queueStr = new Queue<string>();
queueStr.enqueue('hi');
queueStr.enqueue('privet');
console.log(queueStr.peek());    // hi
console.log(queueStr.size());    // 2
console.log(queueStr.dequeue()); // hi
console.log(queueStr.size());    // 1

//-----------------------------------------------------------------
//Завдання #3: Узагальнена функція сортування

function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  return [...arr].sort(compareFn);
}

const numbers = [5, 2, 9, 3];
const sortedNumbers = sortArray(numbers, (a, b) => a - b);
console.log(sortedNumbers); // [2, 3, 5, 9]

const strings = ['banana', 'apple', 'cherry'];
const sortedStrings = sortArray(strings, (a, b) => a.localeCompare(b));
console.log(sortedStrings); // ["apple", "banana", "cherry"]

//-----------------------------------------------------------------
//Завдання #4: Узагальнені обмеження

function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Alice', age: 30 };
console.log(extractProperty(user, 'name')); // Alice
console.log(extractProperty(user, 'age'));  // 30
//console.log(extractProperty(user, 'ololo')); // TS error

const student = { id: 2, course: 'History', group: 'Blink-182' };
console.log(extractProperty(student, 'course')); // History
console.log(extractProperty(student, 'group'));  // Blink-182
//console.log(extractProperty(student, 'lalala')); // // TS error

//-----------------------------------------------------------------
// Завдання #5: Узагальнені типи та користувацькі колекції
interface Identifiable {
  id: number;
}

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    if (this.items.some(existing => existing.id === item.id)) {
      throw new Error(`Item with id ${item.id} already exists.`);
    }
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  removeById(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  getAll(): T[] {
    return [...this.items];
  }
}

type User = { id: number; name: string; email: string };
const userRepository = new Repository<User>();
userRepository.add({ id: 1, name: 'Alice', email: 'alice@example.com' });
userRepository.add({ id: 2, name: 'Bob', email: 'bob@example.com' });

console.log(userRepository.getAll());      // [{ id: 1, name: 'Alice', email: 'alice@example.com' }, { id: 2, name: 'Bob', email: 'bob@example.com' }]
console.log(userRepository.getById(1));    // { id: 1, name: 'Alice', email: 'alice@example.com' }
console.log(userRepository.removeById(1)); // true
console.log(userRepository.removeById(8)); // false
console.log(userRepository.getAll());      // [{ id: 2, name: 'Bob', email: 'bob@example.com' }]

type Product = { id: number; title: string; price: number };
const productRepository = new Repository<Product>();
productRepository.add({ id: 1, title: 'Laptop', price: 1200 });
productRepository.add({ id: 2, title: 'Phone', price: 800 });

console.log(productRepository.getAll());      // [{ id: 1, title: 'Laptop', price: 1200 }, { id: 2, title: 'Phone', price: 800 }]
console.log(productRepository.getById(1));    // { id: 1, title: 'Laptop', price: 1200 }
console.log(productRepository.removeById(1)); // true
console.log(productRepository.removeById(8)); // false
console.log(productRepository.getAll());      // [{ id: 2, title: 'Phone', price: 800 }]
