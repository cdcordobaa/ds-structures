export interface IComparable<T> {
  compareTo: (object: T) => number;
}

export class Comparable<T> implements IComparable<T> {
  compareTo = (object: T) => {
    return undefined;
  };
}
