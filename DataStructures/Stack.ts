

interface IStack<T> {
    push: (item : T) => void; // void fuction push (T item ) {}
    pop: () => T; //T fuction pop () {}
    peek: () => T;
    length: () => number;
    isEmpty: () => boolean;
}

class ArrayStack<T> implements IStack<T>{

    private stack : Array<T>;
    private size: number;

    constructor(initialCapacity?: number) {
        let capacity = initialCapacity !== undefined ? initialCapacity : 10;
        this.stack = new Array<T>(capacity); 
        this.size = 0;
    }

    push = (item :T) => {
        this.stack[this.size] = item;
        this.size ++;
    }

    pop = () =>{ // T funtion pop () {}
        let item = this.stack[this.size -1];
        this.stack[this.size - 1 ] = undefined;
        this.size --;
        return item;
    }

    peek = () => {
        return this.stack[this.size];
    }

    length = () => {
        return this.size;
    }

    isEmpty = () => {
        return this.size === 0 ? true : false;
    }

    print = () => {
        console.log("stack is:", this.stack);
    }

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

class LinkedStack<T> implements IStack<T>{

    private head: LinkedNode<T>; 
    private size: number;

    constructor() {
        this.head = undefined;
        //this.tail = undefined;
        this.size = 0;
    }

    push = (item :T) => {
        if( this.isEmpty() ){
            this.head = new LinkedNode<T>(item, undefined);
        }
        else {
            let newNode = new LinkedNode<T>(item, undefined);
            let temporalHead = this.head
            this.head = newNode;
            newNode.next = temporalHead;
        }
        this.size++
    }

    pop = () =>{

        this.head = this.head.next;
        this.size--;
        return this.head.data;
    }
    peek = () => {
        return undefined;
    }

    length = () => {
        return undefined;
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


export {ArrayStack, LinkedStack}