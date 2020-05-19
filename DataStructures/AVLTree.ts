interface IComparable<T> {
  compareTo: (object: T) => number;
}

class Comparable<T> implements IComparable<T> {
  compareTo = (object: T) => {
    return undefined;
  };
}

interface IAVLNode<T> {
  left: IAVLNode<T>;
  right: IAVLNode<T>;
  parent: IAVLNode<T>;
  data: T;
  higth: number;
}

class AVLNode<T> implements IAVLNode<T> {
  left: IAVLNode<T> = undefined;
  right: IAVLNode<T> = undefined;
  data: T = undefined;
  parent: IAVLNode<T> = undefined;
  higth = 1;

  constructor(
    data: T,
    left?: AVLNode<T>,
    right?: AVLNode<T>,
    parent?: AVLNode<T>
  ) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

interface IAVLTree<T> {
  root: AVLNode<T>;
  rightRotation: (node: AVLNode<T>) => AVLNode<T>;
  leftRotation: () => AVLNode<T>;
  balanceNode: (node: AVLNode<T>) => void;
  find: (data: T, node: AVLNode<T>) => AVLNode<T>;
  next: (node: AVLNode<T>) => AVLNode<T>;
  insert: (dataToInsert: T) => AVLNode<T>;
  calculateLoadFactor: (node: AVLNode<T>) => number;
}

class Student<T extends Comparable<T>> {

    id: number
    compareTo = (object: T) => {
        if(this.id < object.id){
            return -1
        }
    };
}

class AVLTree<T extends Comparable<T>> implements IAVLTree<T> {
  root = undefined;

  rightRotation = () => {
    return undefined;
  };

  leftRotation = () => {
    return undefined;
  };

  find = (lookingValue: T, node: AVLNode<T>) => {
    if (node.data.compareTo(lookingValue) === 0) {
      return node;
    }

    if (node.data.compareTo(lookingValue) === -1) {
      return node.right !== undefined
        ? this.find(lookingValue, node.right)
        : node;
    }

    if (node.data.compareTo(lookingValue) === 1) {
      return node.left !== undefined
        ? this.find(lookingValue, node.left)
        : node;
    }
  };

  // function insert(T data){}
  insert = (dataToInsert: T) => {
    let nodeToInsert = this.find(dataToInsert, this.root);

    let newNode: AVLNode<T> = undefined;

    if (nodeToInsert.data.compareTo(dataToInsert) === 0) {
      return nodeToInsert;
    }

    if (nodeToInsert.data.compareTo(dataToInsert) === -1) {
      nodeToInsert.right = new AVLNode(
        dataToInsert,
        undefined,
        undefined,
        nodeToInsert
      );
      newNode = nodeToInsert.right;
    }

    if (nodeToInsert.data.compareTo(dataToInsert) === 1) {
      nodeToInsert.left = new AVLNode(
        dataToInsert,
        undefined,
        undefined,
        nodeToInsert
      );
      newNode = nodeToInsert.left;
    }

    this.balanceNode(newNode);

    return undefined;
  };

  balanceNode(node: AVLNode<T>) {
    let loadFactor = this.calculateLoadFactor(node);

    if (loadFactor < 2) {
      if (node.parent !== undefined) {
        this.balanceNode(node.parent);
      }
    } else {
      this.executeRotations(node);
    }
  }

  calculateLoadFactor = (node: AVLNode<T>) => {
    const lefth = node.left !== undefined ? node.left.higth : 0;
    const righth = node.right !== undefined ? node.right.higth : 0;

    return Math.abs(lefth - righth);
  };

  executeRotations = (node: AVLNode<T>) => {
    let rotationCase: string = "";

    const lefth = node.left ? node.left.higth : 0;
    const righth = node.right ? node.right.higth : 0;

    if (lefth > righth) {
      const left_lefth = node.left.left ? node.left.left.higth : 0;
      const left_righth = node.left.right ? node.right.higth : 0;

      if (left_lefth > left_righth) {
        rotationCase = "LL";
      } else {
        rotationCase = "RL";
      }
    } else {
      const rigth_lefth = node.right.left ? node.left.left.higth : 0;
      const rigth_righth = node.right.right ? node.right.higth : 0;

      if (rigth_righth > rigth_lefth) {
        rotationCase = "RR";
      } else {
        rotationCase = "LR";
      }
    }

    switch (rotationCase) {
      case "LL": {
        this.rotateLeft(node);
      }
      case "LR": {
          this.rotateLeft(node.right)
          this.
      }

      default:
        break;
    }
  };

  rotateLeft = (node: AVLNode<T>) => {
    let pivot = node.left;
    let temporaryRigthSubTree = pivot.right;
    pivot.right = pivot.parent;
    pivot.parent = pivot.parent.parent;
    if (pivot.parent !== null) {
      if (pivot.data.compareTo(pivot.parent.data) === -1) {
        pivot.parent.left = pivot;
      } else {
        pivot.parent.right = pivot;
      }
    }
    pivot.right.parent = pivot;
    pivot.right.left = temporaryRigthSubTree;
    temporaryRigthSubTree.parent = pivot.right;
  };

  next = (node: AVLNode<T>) => {
    return undefined;
  };

  //! code Extracted from https://gist.github.com/subeeshb/dd338088ab04607b18a1
  prettyPrint = () => {
    let printNodes = (levels) => {
      for (let i = 0; i < levels.length; i++) {
        let spacerSize = Math.ceil(40 / ((i + 2) * 2));
        let spacer = new Array(spacerSize + 1).join("  ");
        let lines = levels[i].map(function (val, index) {
          return index % 2 === 0 ? " /" : "\\ ";
        });
        levels[i].unshift("");
        lines.unshift("");
        if (i > 0) {
          console.log(lines.join(spacer));
        }
        console.log(levels[i].join(spacer));
      }
    };

    let extractNodes = function (node, depth, levels) {
      //traverse left branch
      if (!!node.left) {
        levels = extractNodes(node.left, depth + 1, levels);
      }

      levels[depth] = levels[depth] || [];
      levels[depth].push(node.value);

      //traverse right branch
      if (!!node.right) {
        levels = extractNodes(node.right, depth + 1, levels);
      }

      return levels;
    };
    let levels = extractNodes(this.root, 0, []);
    printNodes(levels);
  };
}
