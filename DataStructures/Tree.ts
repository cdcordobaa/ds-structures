import { ITreeNode, TreeNode } from './TreeNode'


interface ITree {
    isEmpty: () => boolean;
    getRoot: () => TreeNode;
    createTree: (parent: TreeNode, left: TreeNode, right: TreeNode) => ITree;

    preOrder: (node: TreeNode) => void;
    inOrder: (node: TreeNode) => void;
    postOrder: (node: TreeNode) => void;
    levelOrder: (node: TreeNode) => void;
}

class Tree implements ITree {

    root: TreeNode;
    size: number;
    heigth: number;

    constructor() {

    }

    createTree() {
        return undefined;
    }

    visit(node: TreeNode) {
        console.log("The key is", node.key);
    }

    isEmpty() {
        return this.size === 0;
    }

    getRoot() {
        return this.root;
    }

    preOrder(node: TreeNode) {
        if (node !== undefined) {
            this.visit(node);
            this.preOrder(node.left);
            this.preOrder(node.right)
        }

    }
    inOrder(node: TreeNode) {
        if (node !== undefined) {
            this.preOrder(node.left);
            this.visit(node);
            this.preOrder(node.right)
        }
    }
    postOrder(node: TreeNode) {
        if (node !== undefined) {
            this.preOrder(node.left);
            this.preOrder(node.right)
            this.visit(node);
        }
    }

    find(value: string, node: TreeNode) {

        if (node === undefined) {
            return undefined;
        }

        if (value === node.key) {
            return node;
        }

        let N: TreeNode;

        if (value < node.key) {
            N = this.find(value, node.left);
        }
        else {
            N = this.find(value, node.right);
        }

        return N === undefined ? node : N;

    }

    next(root: TreeNode) {

        if (root.right !== undefined) {
            return this.leftDescendant(root.right);
        } else {
            return this.rigthAncestor(root);
        }

    }

    leftDescendant(node: TreeNode) {

        if (node.left !== undefined) {
            return this.leftDescendant(node.left);
        }
        else {
            return node;
        }

    }

    rigthAncestor(node: TreeNode) {

        let i: TreeNode = node.parent;

        while (i.key < node.key) {
            if (i.parent) {
                i = i.parent;
            }
            else {
                break;
            }
        }

        return i;
    }

    levelOrder(node: TreeNode) {
        return undefined
    }

}