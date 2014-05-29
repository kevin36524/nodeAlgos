var Tree = function (obj) {
    var val, left, right;

    if (!obj || !obj.v) {
       return;
    }
    
    left = obj.l && new Tree(obj.l);
    right = obj.r && new Tree(obj.r);

   this.val = obj.v;
   if (left) {
       this.left = left;
   }
   if (right) {
       this.right = right;
   }
}


Tree.prototype = {
    addVal : function (val) {
        var _this = this, node;

        node = _this;
        if (!node.val) {
          node.val = val;
          return;
        }

        while (1) {
            if (node.val < val) {
                // go to right;
                if (node.right) {
                    node = node.right;
                } else {
                    node.right = new Tree({v:val});
                    return;
                }
            } else if (node.val > val) {
                // go to left;
                if (node.left) {
                    node = node.left;
                } else {
                    node.left = new Tree ({v:val});
                    return;
                }
            } else {
                // node already exists
                return;
            }
        }

    }
}

var findMinVal = function (tree) {
    var node = tree;

    while (node) {
        if (node.left) {
            node = node.left;
        } else {
            return node.val;
        }
    }
}

var removeNode = function (tree, delVal) {
    var parentNode = null, node, tempNode;

    if (!tree || !tree.val) { return tree; }

    node = tree;

    while (node && delVal != node.val) {
        parentNode = node;
        if (delVal > node.val) {
            node = node.right;
        } else {
            node = node.left;
        }
    }

    if (!node) { 
        return tree; // val doesn't exist in the tree
    }

    // deleting leaf node;
    if (!node.left && !node.right) {
        if (parentNode.left == node) { 
            delete (parentNode.left);
        } else {
            delete(parentNode.right);
        }
    }

    // only one node present
    if (!node.left && node.right || node.left && !node.right) {
        tempNode = node.left ? node.left : node.right;
        if (!parentNode) {
            tree = tempNode;
        } else if (parentNode.left == node) {
            parentNode.left = tempNode;
        } else {
            parentNode.right = tempNode;
        }
    }

    if (node.left && node.right) {
        tempNode = findInOrderSucc(node);
        node.val = tempNode.val;
        tempNode = removeNode(node.right,tempNode.val);
        if (!tempNode) {
            delete (node.right);
        } else {
            node.right = tempNode;
        }
    }

    return tree;

}

findInOrderSucc = function(tree) {
    var retNode, node = tree.right;

    if (!node) {
        return;
    }

    while (node) {
        retNode = node;
        node = node.left;
    }

    return retNode;
}

var tree = new Tree();

tree.addVal(50);
tree.addVal(25);
tree.addVal(100);
tree.addVal(75);
tree.addVal(35);
tree.addVal(10);
tree.addVal(40);
tree.addVal(80);
tree.addVal(90);

console.log(JSON.stringify(tree));
console.log(findMinVal(tree));

console.log(JSON.stringify(removeNode(tree,50)));
