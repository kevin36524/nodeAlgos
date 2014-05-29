var Tree = function (cfg) {
    if (!cfg || !cfg.v) {
        return;
    }

    this.val = cfg.v;
    if (cfg.l) {
        this.left = new Tree(cfg.l);
    }
    if (cfg.r) {
        this.right = new Tree(cfg.r);
    }
};

var getRightMostVal = function(tree) {
    var node = tree, retVal;

    while (node) {
        retVal = node.val;
        node = node.right;
    }

    return retVal;
};

var getLeftMostVal = function (tree) {
    var node = tree, retVal;
    while (node) {
        retVal = node.val;
        node = node.left;
    }
    return retVal;
};

var checkForBST = function (tree) {
    var val;

    if (!tree || !tree.val) {
        return true;
    }

    val = tree.val;

    // if left is a BST
    // if right is a BST
    // and if maxLeft < tree.val < minRight return true
    if (checkForBST(tree.left) && checkForBST(tree.right)) {
        if ((!tree.left || getRightMostVal(tree.left) < val) && (!tree.right || getLeftMostVal(tree.right) > val)) {
           return true;
        }
    } 

    return false;
};

var tree1 = new Tree({"v":50,"l":{"v":25,"r":{"v":35,"r":{"v":40}},"l":{"v":10}},"r":{"v":100,"l":{"v":75}}});

//tree1 = new Tree({v:1,l:{v:2,l:{v:3},r:{v:4}},r:{v:5,l:{v:6}}});

console.log(JSON.stringify(tree1));

if (checkForBST(tree1)) {
    console.log("this is a BST");
} else {
    console.log("Nopes not a BST");
}
