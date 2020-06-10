import { HashMap } from "./DataStructures/HashMap";

class Student {
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
  toString() {
    return this.id;
  }
}
let myHash: HashMap<number, Student> = new HashMap<number, Student>(20);

let idsToInsert = [20, 30, 40, 25, 22, 55, 65, 23, 26, 28];

for (const id of idsToInsert) {
  const student = new Student(id);
  myHash.add(id, student);
}
myHash.prettyPrint();

console.log(myHash.hasKey(62));

myHash.remove(30);
myHash.remove(23);
myHash.remove(28);
myHash.prettyPrint();
