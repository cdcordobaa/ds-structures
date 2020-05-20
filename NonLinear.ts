import AVL, { IAVLTree } from "./DataStructures/AVLTree";
import { Comparable, IComparable } from "./Interfaces/interface";

class Student implements IComparable<Student> {
  id: number = undefined;
  name: string = undefined;
  tel: string = undefined;

  constructor(id: number, name: string, tel: string) {
    this.id = id;
    this.name = name;
    this.tel = tel;
  }

  compareTo(b: Student) {
    if (b.id == this.id) {
      return 0;
    }

    return this.id > b.id ? 1 : -1;
  }

  toString() {
    return this.id;
  }
}

let myAVLInstance = new AVL<Student>();

let student1 = new Student(10, "Super Man", "254");
let student2 = new Student(20, "Super Man", "254");

let student3 = new Student(60, "Super Man", "254");
let student4 = new Student(40, "Super Man", "254");
let student5 = new Student(5, "Super Man", "254");

console.log("st", student1);

myAVLInstance.insert(student1);
myAVLInstance.insert(student2);
myAVLInstance.insert(student3);
// myAVLInstance.insert(student4);
// myAVLInstance.insert(student5);

myAVLInstance.prettyPrint();
