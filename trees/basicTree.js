Tree = function (obj) {
    var val, left, right, _this = this;

    val = obj.r;
    left = obj.lt && new Tree(obj.lt);
    right = obj.rt && new Tree(obj.rt);

    _this.val = val;
    if (left) {
        _this.left = left;
    }
    if (right) {
        _this.right = right;
    }
}

Tree.prototype = {
    getOrderedString : function (type) {
       var _this = this, retStr = "";
     
       if (!type) {
          type = "pre";
       }

       if (type == "pre" && _this.val) {
          retStr += _this.val + ",";
       } 
       if (_this.left) {
          retStr +=  _this.left.getOrderedString(type);
       }
       if (type == "in" && _this.val) {
          retStr += _this.val + ",";
       } 
       if (_this.right) {
           retStr += _this.right.getOrderedString(type);
       }
       if (type == "post" && _this.val) {
          retStr += _this.val + ",";
       } 
       return retStr;
    }
}



var tree = new Tree({r:1,lt:{r:2,lt:{r:3},rt:{r:4}},rt:{r:5,lt:{r:6}}});
console.log(tree);
console.log("preOrder :- " + tree.getOrderedString("pre"));
console.log("postOrder :- " + tree.getOrderedString("post"));
console.log("inOrder :- " + tree.getOrderedString("in"));
