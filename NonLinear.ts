import AVL, { IAVLTree } from "./DataStructures/AVLTree";
import { Comparable, IComparable } from "./Interfaces/interface";

class Student implements IComparable<Student> {
  id: number = undefined;
  name: string = undefined;
  tel: string = undefined;
  career: string;
  nickName: string = undefined;

  constructor(id: number, name?: string, tel?: string, career?: string) {
    this.id = id;
    this.name = name;
    this.tel = tel;
    this.career = career;
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

let idsToInsert = [20, 30, 40, 25, 22, 55, 65, 23, 26, 28];

let myAVLInstance = new AVL<Student>();

for (const id of idsToInsert) {
  const student = new Student(id);
  myAVLInstance.insert(student);
  console.log(`pretty print after balacing`);
  myAVLInstance.prettyPrint();
}
