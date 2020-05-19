
export interface ITreeNode {
    key: string;
    heigth: () => number;
    size: () => number;

    preOrder: () => void;
    inOrder: () => void;
    postOrder: () => void;
    levelOrder: () => void;
}

export class TreeNode implements ITreeNode {

    public key: string
    public right: TreeNode;
    public left: TreeNode;
    public parent: TreeNode;


    constructor(key?: string) {
        this.key = key ? key : '';
    }

    heigth = () => {
        let heitghLeft = 0;
        let heitghRigth = 0;
        if (this.left) {
            heitghLeft = this.left.heigth();
        }
        if (this.right) {
            heitghRigth = this.right.heigth();
        }
        return 1 + Math.max(heitghLeft, heitghRigth);

    }

    size = () => {
        let countLeft = 0;
        let countRigth = 0;
        if (this.left) {
            countLeft = this.left.size();
        }
        if (this.right) {
            countRigth = this.right.size();
        }
        return 1 + countLeft + countRigth;
    }

    visit() {
        console.log("They Key is", this.key);
    }

    preOrder = () => {
        this.visit();
        this.left.preOrder()
        this.right.preOrder()
    }

    inOrder: () => void;
    postOrder: () => void;


    levelOrder: () => void;

}