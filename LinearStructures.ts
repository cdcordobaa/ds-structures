import * as Queue from "./DataStructures/Queue";
import * as Stack from "./DataStructures/Stack";
import * as Dynamic from "./DataStructures/DynamicList";

const testStacks = () => {
  const arrayCalls = () => {
    let myArrayStack = new Stack.ArrayStack<string>(20);
    myArrayStack.push("gray");
    myArrayStack.print();
    myArrayStack.push("blue");
    myArrayStack.print();
    myArrayStack.push("red");
    myArrayStack.print();
    let a = myArrayStack.pop();
    myArrayStack.print();
    console.log("hey you just deleted", a);
  };

  const linkedCalls = () => {
    let myArrayStack = new Stack.LinkedStack<string>();
    myArrayStack.push("gray");
    myArrayStack.print();
    myArrayStack.push("blue");
    myArrayStack.print();
    myArrayStack.push("yellow");
    myArrayStack.print();
    myArrayStack.pop();
    myArrayStack.print();
    myArrayStack.pop();
    myArrayStack.print();
  };

  return {
    arrayCalls,
    linkedCalls,
  };
};

const testQueues = () => {
  const arrayCalls = () => {
    let myQueueu = new Queue.ArrayQueue<string>(4);
    myQueueu.enqueue("gray");
    myQueueu.print();
    myQueueu.enqueue("blue");
    myQueueu.print();
    myQueueu.enqueue("red");
    myQueueu.print();
    myQueueu.dequeue();
    myQueueu.dequeue();
    myQueueu.print();
    myQueueu.enqueue("purple 1");
    myQueueu.enqueue("purple 2");
    myQueueu.print();
    myQueueu.enqueue("purple 3");
    myQueueu.print();
    myQueueu.enqueue("last in the que");
    myQueueu.print();
  };

  const linkedCalls = () => {
    let myQueueu = new Queue.LinkedQueue<string>();
    myQueueu.enqueue("gray");
    myQueueu.print();
    myQueueu.enqueue("white");
    myQueueu.print();
    myQueueu.enqueue("orage");
    myQueueu.print();
    let d = myQueueu.dequeue();
    myQueueu.print();
    console.log("hey just attended customer", d);
  };

  return {
    arrayCalls,
    linkedCalls,
  };
};

// console.time("queues");

// let stacks = testStacks();
// //stacks.linkedCalls();

// let queues = testQueues();
// queues.arrayCalls();

// console.timeEnd("queues");

let mydList: Dynamic.DinamicList;
mydList = new Dynamic.DinamicList();

// mydList.add("Blue");
// mydList.add("Blue");
// mydList.add("Blue");
// mydList.add("red");

const operationsCount = 1200000;

let init = Date.now();
console.time("queues");

for (let index = 0; index < operationsCount; index++) {
  const element = mydList.add(`${index}`);
}

console.timeEnd("queues");
let finish = Date.now();

console.log("average cost", finish - init, (finish - init) / operationsCount);

let array = [];

array.push("2");
