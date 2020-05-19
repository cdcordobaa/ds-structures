




interface IDinamicList {
    add: (element: string) => void; // public void add(int element){} 
    remove: (index: number) => string;
    length: () => number;
    set: (index: number, value: string) => string;
    get: (index: number) => string;
}


export class DinamicList implements IDinamicList {

    private list : Array<string>;
    private size: number;
    private capacity: number;

    constructor() {
	    this.list = new Array<string>(1);
        this.size = 0;
        this.capacity = 1;
        console.log('data is', this.list, this.size, this.capacity);
    }


    add = (element: string) => {
        if(this.size === this.capacity){
            this.resize();
        }
        this.list[this.size++] = element;
    }  

    resize = () => {

        this.capacity = this.capacity * 2;
        let copiedArray = new Array<string>(this.capacity);

        for (let i = 0; i < this.list.length; i++) {
            copiedArray[i] = this.list[i];
        }

        this.list = copiedArray;

    }

    remove = (index: number) => {
        //this.list[index] = undefined;
        return undefined;
    };

    length = () => {
        return undefined;
     }

    set = (index: number, value: string) => {
        return undefined
    }

    get = (index: number) => {
        return undefined
    };

    print() {
        console.log("the elemens are:", this.list);
        console.log("capacity is", this.size);
    }
}

