var Tree = function(cfg) {

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
}


var findClosestAncestor = function(tree,val1,val2) {

    var leftVal, rightVal;

    // if tree is null return null
    if (!tree || !tree.val) {
        return ;
    }
    leftVal = tree.left && tree.left.val;
    rightVal = tree.right && tree.right.val;

    // if val1 or val2 is either equal to left or right child then return tree.val;

    if (val1 == leftVal || val1 == rightVal || val2 == leftVal || val2 == rightVal) {
        return tree.val;
    }

    // try in left tree with both vals
    leftVal = findClosestAncestor(tree.left,val1,val2);

    // try in right tree with both vals
    rightVal = findClosestAncestor(tree.right,val1,val2);

    // if only left tree returns non-null then return leftRetVal
    if (leftVal && !rightVal) {
        return leftVal;
    }
    // if only right tree returns non-null then return rightRetVal
    if (rightVal && !leftVal) {
        return rightVal;
    }
    // if both returns return tree.val 
    if (rightVal && leftVal) {
        return tree.val;
    }
    // else return null
    return null;
}

var tree = new Tree ({v:1,l:{v:2,l:{v:3},r:{v:4}},r:{v:5,l:{v:6}}});

console.log(JSON.stringify(tree));

console.log("closest of 3 and 4 is " + findClosestAncestor(tree,3,4));
console.log("closest of 2 and 3 is " + findClosestAncestor(tree,2,3));
console.log("closest of 3 and 6 is " + findClosestAncestor(tree,6,3));
