interface IHashNode<K, V> {
  key: K;
  value: V;
  next: IHashNode<K, V>;
}

interface Hashable {
  hash: () => number;
}
interface IHashmap<K , V> {
  add: (key: K, value: V) => IHashNode<K, V>; //myhash.add("1032", student1);
  remove: (key: K) => IHashNode<K, V>;
  hasKey: (key: K) => boolean;
  get: (key: K) => V | undefined | null;
  intHash: (key: K) => number;
}

class HashNode<K, V> {
  key: K;
  value: V;
  next: HashNode<K, V>;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.next = undefined;
  }
}

export class HashMap<K, V> implements IHashmap<K,V> {
  cardinality: number;
  size: number;
  table: Array<HashNode<K, V>>;

  constructor(initialCapacity?: number) {
    const capacity = initialCapacity | 10;
    this.cardinality = capacity;
    this.table = new Array(capacity);
  }

  getIndex = (key: K) => {
    let index = 0;
    if (typeof key === "number") {
      index = this.intHash(key);
    }
    if (typeof key === "string") {
      index = this.polyhash(key);
    }
    if (typeof key === "object") {
      // if someone mad want to index using an object
      //   key.hash() % this.cardinality;
    }
    return index;
  };

  add = (key: K, value: V) => {
    let loadFactor = this.size / this.cardinality;

    // if(loadFactor 0.8){

    // }

    const index = this.getIndex(key);

    let iterator: HashNode<K, V> = this.table[index];

    if (iterator === undefined) {
      this.table[index] = new HashNode<K, V>(key, value);
      console.log("entering", index, this.table[index]);
      this.size++;
      return this.table[index];
    } else {
      while (iterator.next !== undefined && iterator.key !== key) {
        iterator = iterator.next;
      }

      if (iterator.key === key) {
        iterator.value = value;
      }
      iterator.next = new HashNode<K, V>(key, value);
    }
    this.size++;
    return iterator.next;
  };

  remove = (key: K) => {
    const index = this.getIndex(key);

    let iterator: HashNode<K, V> = this.table[index];

    if (iterator === undefined) {
      return undefined;
    } else {
      let tracer = undefined;
      while (iterator.next !== undefined && iterator.key !== key) {
        tracer = iterator;
        iterator = iterator.next;
      }

      if (iterator.key === key) {
        if (tracer) {
          tracer.next = iterator.next;
        } else {
          this.table[index] = iterator.next;
        }
      } else {
        return undefined;
      }
    }
    return iterator;
  };

  intHash = (key: K) => {
    const a = 25;
    const b = 102;
    const p = 552493;
    const x = (key as unknown) as number;
    return ((a * x + b) % p) % this.cardinality;
  };

  polyhash(key: K) {
    return 0;
  }

  hasKey(key: K) {
    const index = this.getIndex(key);

    let iterator: IHashNode<K, V> = this.table[index];

    if (iterator === undefined) {
      return false;
    } else {
      let tracer = undefined;
      while (iterator.next !== undefined && iterator.key !== key) {
        tracer = iterator;
        iterator = iterator.next;
      }

      if (iterator.key === key) {
        return true;
      } else {
        return false;
      }
    }
  }

  prettyPrint = () => {
    // console.log(this.table);
    this.table.forEach((row, index) => {
      console.log("cell number", index);
      let iterator = row;

      while (iterator) {
        console.log("data", iterator.value);
        iterator = iterator.next;
      }
    });
  };
  get=(key: K) =>  {
      //! TODO
      return undefined;
  }

  }
  /*
  get = (key: K) => {
    if (typeof key === "number") {
      index = this.intHash(key);
    }
      let nodo = table[index];
      while(nodo.next != undefined && nodo != undefined){
        if(nodo.key == K){
          return nodo;
        }

        nodo = nodo.next
      }
      return undefined;
      
  }
  
  */
}
