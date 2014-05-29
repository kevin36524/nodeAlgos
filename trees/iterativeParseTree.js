var stack = (function () {
    var localStack = [], retObj = {};

    retObj.push = function (it) {
       localStack.push(it);
    };

    retObj.pop = function (it) {
       return localStack.splice(-1)[0];
    };

    retObj.clear = function () {
        localStack = [];
    };

    retObj.peek = function () {
        return localStack[localStack.length -1];
    };

    return retObj;

})();

var queue = (function () {
    var retObj = {}, localQueue = [];

    retObj.push = function (obj) {
        localQueue.push(obj);
    };

    retObj.pop = function () {
        return localQueue.splice(0,1)[0];
    };

    retObj.clear = function () {
        localQueue = [];
    };

    return retObj;

})();

var Tree = function (obj) {
    var val, left, right;

    if (!obj || !obj.r) return;
    val = obj.r;
    left = obj.lt && new Tree(obj.lt);
    right = obj.rt && new Tree(obj.rt);

    if (val) {
        this.val = val;
    }
    if (left) {
        this.left = left;
    }
    if (right) {
        this.right = right;
    }
}

Tree.prototype = {
    getPreorderedString : function () {
       var _this = this, node = null, retStr = "";

       // clear stack
       stack.clear();

       // node = root
       node = _this;

       while (node) {
           // visit the node;
           retStr += node.val + ",";
           // push right node;
           node.right && stack.push(node.right);
           // push left node;
           node.left && stack.push(node.left);
           // node = pop()
           node = stack.pop();
       }

       return retStr;
    },

    getInorderString : function() {
       var _this = this, node = null, retStr = "";

       // clear stack
       stack.clear();

       // node = root
       node = _this;

       while (stack.peek() || node) {
          if (node) {
             stack.push(node);
             node = node.left;
          } else {
             node = stack.pop();
             retStr += node.val + "," ;
             node = node.right;
          }
       }
       return retStr;
    }, 

    getPostorderString : function() {
       var _this = this, node = null, retStr = "", peek, lastNodeVisited = null ;

       stack.clear();
       node = _this;

       while (stack.peek() || node) {
           if (node) {
               stack.push(node);
               node = node.left;
           } else {
               peek = stack.peek();
               if (peek.right && peek.right != lastNodeVisited) {
                  node = peek.right;
               } else {
                  stack.pop();
                  retStr += peek.val + ",";
                  lastNodeVisited = peek;
               }
           }
       }

       return retStr; 

    },

    getLevelOrderString : function() {
       var _this = this, node = null, retStr = "", peek, lastNodeVisited = null ;
       
       queue.clear();

       node = _this;

       while (node) {
           node.left && queue.push(node.left);
           node.right && queue.push(node.right);
           retStr += node.val + ",";
           node = queue.pop();
       }

       return retStr;

    }

}

var tree = new Tree({r:1,lt:{r:2,lt:{r:3},rt:{r:4}},rt:{r:5,lt:{r:6}}});

console.log(tree);
console.log("preOrder :- " + tree.getPreorderedString());
console.log("InOrder :- " + tree.getInorderString());
console.log("PostOrder :- " + tree.getPostorderString());
console.log("LevelOrder :- " + tree.getLevelOrderString());
