

interface IQueue<T> {
    enqueue: (item) => void;
    dequeue: () => T;
    peekFront: () => T;
    peekBack: () => T;
    length: () => number;
    isEmpty: () => boolean;
}

interface INode<T> {
    data: T
    next: INode<T>
}

class LinkedNode<T> implements INode<T> {
    public data : T;
    public next: LinkedNode<T>;

    constructor (item: T, nextNode?: LinkedNode<T>){
        this.data = item;
        this.next = nextNode;
    }

}

class LinkedQueue<T> implements IQueue<T> {

    private head: LinkedNode<T>;
    private tail: LinkedNode<T>; 
    private size: number;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }

    enqueue = (item: T) => {
        if( this.isEmpty() ){
            this.head = new LinkedNode<T>(item, undefined);
            this.tail = this.head;
        }
        else {
            let newNode = new LinkedNode<T>(item, undefined);
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++
    }

    dequeue = () => {
        let nodeToDelete = this.head;
        this.head = this.head.next;
        return nodeToDelete.data;
    }

    peekFront = () => {
        return undefined
    }
    peekBack = () => {
        return undefined
    }

    length = () => {
        return undefined
    }

    isEmpty = () => {
        return this.head === undefined;
    }

    print = () => {
        let nodeIterator = this.head;
        let i = 0;
        let arrayForPrint = [];
        while(nodeIterator !== undefined){
            arrayForPrint.push(nodeIterator.data)
            nodeIterator = nodeIterator.next;
            i++;
        }
        console.log("node at:", i, arrayForPrint);
    }
}


class ArrayQueue<T> implements IQueue<T> {

    private queue: Array<T>; 
    private size: number;
    private top: number;
    private rear: number

    constructor(initialCapacity?: number) {
        let capacity = initialCapacity !== undefined ? initialCapacity : 10;
        this.queue = new Array<T>(capacity);
        this.size = 0;
        this.top = 0;
        this.rear = 0;
    }

    enqueue = (item: T) => {
        if(this.size === this.queue.length){
            return undefined;
        }

        this.queue[this.top] = item;
        this.top = (this.top + 1) % this.queue.length
        this.size ++;
    }

    dequeue = () => {
        if( this.isEmpty() ){
            return undefined;
        }

        let temp = this.queue[this.rear];
        this.queue[this.rear] = undefined;
        this.rear = (this.rear + 1) % this.queue.length;
        this.size --;
        return temp
    }

    peekFront = () => {
        return undefined
    }
    peekBack = () => {
        return undefined
    }

    length = () => {
        return undefined
    }

    isEmpty = () => {
        return this.size === 0 ? true : false;
    }

    print = () => {
        console.log("que is:", this.queue);
    }
}

export{LinkedQueue, ArrayQueue}