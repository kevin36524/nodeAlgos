var Tree = function (obj) {
    if (!obj || !obj.v) {
        return;
    }

    this.val = obj.v;
    if (obj.l) {
        this.left = new Tree(obj.l);
    }
    if (obj.r) {
        this.right = new Tree(obj.r);
    }
}  
   
var checkForIdenticalTrees = function(tree1, tree2) {
    if ((!tree1 && !tree2) || (!tree1.val && !tree2.val)) {
        return true;
    }
    if (tree1.val == tree2.val && checkForIdenticalTrees(tree1.left, tree2.left) && checkForIdenticalTrees(tree1.right, tree2.right)) {
       return true;
    } 

    return false;
}

var mirrorTree = function(tree) {
    var retTree, left, right;

    if (!tree) {
        return null;
    }

    retTree = new Tree({v:tree.val});
    left = mirrorTree(tree.right);
    if (left) {
        retTree.left = left;
    }
    right = mirrorTree(tree.left);
    if (right) {
        retTree.right = right;
    }

    return retTree;

}

var inorderString = function (tree) {
    retStr = "";

    if (!tree || !tree.val) {
        return retStr;
    }

    retStr += inorderString(tree.left) + tree.val +","+ inorderString(tree.right);

    return retStr;
}

var getNthNode = function (n,tree,counter) {
    var retNode;
    if (!counter) {
        counter = {i:0};
    }

    if (!tree || !tree.val) {
        return;
    }

    retNode = getNthNode(n,tree.left,counter);
    if (retNode) {return retNode};
    if (counter.i == n ) {
        return tree;
    }
    counter.i++;
    return getNthNode(n,tree.right,counter);
}

var i, tempNode,
tree1 = new Tree({v:1,l:{v:2,l:{v:3},r:{v:4}},r:{v:5,l:{v:6}}}),
tree2 = new Tree({v:1,l:{v:2,l:{v:9},r:{v:4}},r:{v:5,l:{v:6}}});

console.log(JSON.stringify(tree1));
console.log(JSON.stringify(tree2));

if (checkForIdenticalTrees(tree1,tree2)){
    console.log("Both trees are same");
} else {
    console.log("Trees are different");
}

console.log(JSON.stringify(mirrorTree(tree1)));

console.log("Inorder tree1 is :-" + inorderString(tree1));

for (i=0; i<10; i++) {
    tempNode = getNthNode(i,tree1);
    tempNode = tempNode && tempNode.val;
    console.log(i+"th node is " + tempNode );
}
