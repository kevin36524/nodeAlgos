var permutations = function (arr) {
    var i, j, copyArr, perArr, retArr = [] , str;

    if (!arr || arr.length <= 1) {
        return arr;
    }

    for (i in arr) {
        copyArr = arr.join("").split(""); // cloning the array;
        copyArr.splice(i,1);
        perArr = permutations(copyArr);
        str = arr[i];
        for (j in perArr) {
            str += perArr[j];
            retArr.push(str);
            str = arr[i];
        }
    }

    return retArr; 

}

console.log(permutations("ABCD".split("")));
