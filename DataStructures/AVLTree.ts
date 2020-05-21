import { Comparable, IComparable } from "../Interfaces/interface";

interface IAVLNode<T> {
  left: IAVLNode<T>;
  right: IAVLNode<T>;
  parent: IAVLNode<T>;
  data: T;
  heigth: number;
}

class AVLNode<T> implements IAVLNode<T> {
  left: IAVLNode<T> = undefined;
  right: IAVLNode<T> = undefined;
  data: T = undefined;
  parent: IAVLNode<T> = undefined;
  heigth = 1;

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
  // rightRotation: (node: AVLNode<T>) => AVLNode<T>;
  // leftRotation: () => AVLNode<T>;
  balanceNode: (node: AVLNode<T>) => void;
  find: (data: T, node: AVLNode<T>) => AVLNode<T>;
  next: (node: AVLNode<T>) => AVLNode<T>;
  insert: (dataToInsert: T) => AVLNode<T>;
  calculateLoadFactor: (node: AVLNode<T>) => number;
}

class AVLTree<T extends Comparable<T>> implements IAVLTree<T> {
  root = undefined;

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
    if (this.root === undefined) {
      this.root = new AVLNode(dataToInsert, undefined, undefined, undefined);
      return this.root;
    }

    let nodeToInsert = this.find(dataToInsert, this.root);
    console.log(
      `mounting ${dataToInsert} into node ${nodeToInsert.data.toString()}`
    );
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

    this.updateHeigth(newNode);
    this.balanceNode(newNode);

    return undefined;
  };

  updateHeigth(node: AVLNode<T>) {
    if (!node) {
      return;
    }

    const left = node.left ? node.left.heigth : 0;
    const rigth = node.right ? node.right.heigth : 0;
    node.heigth = 1 + Math.max(left, rigth);

    this.updateHeigth(node.parent);
  }

  balanceNode(node: AVLNode<T>) {
    if (!node) {
      return;
    }

    let loadFactor = this.calculateLoadFactor(node);

    if (loadFactor >= 2) {
      this.executeRotations(node);
    }
    this.balanceNode(node.parent);
  }

  calculateLoadFactor = (node: AVLNode<T>) => {
    const lefth = node.left !== undefined ? node.left.heigth : 0;
    const righth = node.right !== undefined ? node.right.heigth : 0;

    return Math.abs(lefth - righth);
  };

  executeRotations = (node: AVLNode<T>) => {
    let rotationCase: string = "";

    const lefth = node.left ? node.left.heigth : 0;
    const righth = node.right ? node.right.heigth : 0;

    if (lefth > righth) {
      const left_lefth = node.left.left ? node.left.left.heigth : 0;
      const left_righth = node.left.right ? node.left.right.heigth : 0;

      if (left_lefth > left_righth) {
        rotationCase = "LL";
      } else {
        rotationCase = "RL";
      }
    } else {
      const rigth_lefth = node.right.left ? node.right.left.heigth : 0;
      const rigth_righth = node.right.right ? node.right.right.heigth : 0;

      if (rigth_righth > rigth_lefth) {
        rotationCase = "RR";
      } else {
        rotationCase = "LR";
      }
    }

    switch (rotationCase) {
      case "LL": {
        this.rotateRigth(node.left);
        break;
      }
      case "RR": {
        this.rotateLeft(node.right);
        break;
      }
      case "LR": {
        this.rotateRigth(node.right.left);
        this.rotateLeft(node.right);
        break;
      }
      case "RL": {
        this.rotateLeft(node.left.right);
        this.rotateRigth(node.left);
        break;
      }
      default:
        break;
    }
  };

  rotateRigth = (pivot: AVLNode<T>) => {
    let temporaryRigthSubTree = pivot.right;
    pivot.right = pivot.parent;
    pivot.parent = pivot.parent.parent;
    if (pivot.parent) {
      if (pivot.data.compareTo(pivot.parent.data) === -1) {
        pivot.parent.left = pivot;
      } else {
        pivot.parent.right = pivot;
      }
    } else {
      this.root = pivot;
    }
    pivot.right.parent = pivot;
    pivot.right.left = temporaryRigthSubTree;
    if (temporaryRigthSubTree) {
      temporaryRigthSubTree.parent = pivot.right;
    }
    this.updateHeigth(pivot.right);
  };

  rotateLeft = (pivot: AVLNode<T>) => {
    let temporaryRigthSubTree = pivot.left;
    pivot.left = pivot.parent;
    pivot.parent = pivot.parent.parent;
    if (pivot.parent) {
      if (pivot.data.compareTo(pivot.parent.data) === -1) {
        pivot.parent.left = pivot;
      } else {
        pivot.parent.right = pivot;
      }
    } else {
      this.root = pivot;
    }
    pivot.left.parent = pivot;
    pivot.left.right = temporaryRigthSubTree;
    if (temporaryRigthSubTree) {
      temporaryRigthSubTree.parent = pivot.left;
    }
    this.updateHeigth(pivot.left);
  };

  next = (node: AVLNode<T>) => {
    return undefined;
  };

  //! code modified from https://gist.github.com/subeeshb/dd338088ab04607b18a1
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

    let extractNodes = function (node, depth, levels, index) {
      if (!node) {
        levels[depth] = levels[depth] || [];
        levels[depth][index] = "*";
        return levels;
      }
      //traverse left branch
      levels = extractNodes(node.left, depth + 1, levels, index * 2);
      levels[depth] = levels[depth] || [];
      levels[depth][index] = node.data.toString();
      //traverse right branch
      levels = extractNodes(node.right, depth + 1, levels, index * 2 + 1);

      return levels;
    };
    let levels = extractNodes(this.root, 0, [], 0);
    printNodes(levels);
  };
}

export default AVLTree;

export { IAVLTree, AVLNode };
