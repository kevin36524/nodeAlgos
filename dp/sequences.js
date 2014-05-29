var lis,lcs,lbs,lps,
maxVal = function(a,b) {
    if (a>b) {
        return a;
    }
    return b;
};


// LIS -> longest increasing subsequence 
lis = function (arr) {
    var i,j,maxVal,table = [];
    for (i=0; i < arr.length; i++) {
        table[i] = 1;
    }

    for (i=0; i<arr.length; i++) {
        for (j=0; j<i; j++) {
            if (arr[j] < arr[i] && (table[j] + 1 > table[i])) {
                table[i] = table[j] + 1;
            }
        }
    }

    for (i=0; i<table.length; i++) {
        maxVal = maxVal || table[i];

        if (table[i] > maxVal) {
           maxVal = table[i];
        }
    }

    return maxVal; 
}

console.log("lis is :- " + lis([10,22,9,33,21,50,41,60]));
// OP => 5 because (10,22,33,50,60)

// LCS -> Longest common subseq
var lcsTable;
lcs = function (arr1, arr2) {
    var i,j, retVal, maxIndex1, maxIndex2;

    maxIndex1 = arr1.length - 1;
    maxIndex2 = arr2.length - 1;

    if (!lcsTable) {
        lcsTable = [];
        for (i=0; i <= maxIndex1; i++) {
            lcsTable[i] = []
            for (j=0; j <= maxIndex2; j++) {
                lcsTable[i][j] = 0;
            }
        }
    }

    if (!arr1 || !arr2 || !arr1.length || !arr2.length) {
        return 0;
    }

    if (lcsTable[maxIndex1][maxIndex2]) {
       return lcsTable[maxIndex1][maxIndex2];
    }

    if (arr1[maxIndex1] == arr2[maxIndex2]) {
       retVal = 1 + lcs(arr1.slice(0,-1),arr2.slice(0,-1));
       lcsTable[maxIndex1][maxIndex2] = retVal;
       //console.log(arr1[maxIndex1]);
       return retVal;
    }

    retVal = maxVal(lcs(arr1,arr2.slice(0,-1)),lcs(arr1.slice(0,-1),arr2));
    lcsTable[maxIndex1][maxIndex2] = retVal;
    return retVal;

}
console.log("LCS of arr1 and arr2 is :- " + lcs("ABCDGH".split(''),"AEDFHR".split('')));
// LBS -> Longest bitonic subseq
lbs = function (arr) {
    var i, j, lisTable = [], ldsTable = [], maxLength = 2;

    for (i=0; i<arr.length; i++) {
        lisTable[i] = 1;
        ldsTable[i] = 1;
    }

    for (i=0; i<arr.length; i++) {
        for (j=0; j<i; j++) {
            if (arr[i] > arr[j] && lisTable[i] < lisTable[j] + 1) {
                lisTable[i] = lisTable[j] + 1;
            }
        }
    }

    for (i=arr.length-1; i>-1; i--) {
        for (j=arr.length-1; j>i; j--) {
            if (arr[i] > arr[j] && ldsTable[i] < ldsTable[j] + 1) {
                ldsTable[i] = ldsTable[j] + 1;
            }
        }
    }

    for (i=0; i<arr.length; i++) {
        if (lisTable[i] + ldsTable[i] > maxLength) {
            maxLength = lisTable[i] + ldsTable[i];
        }
    }

    return maxLength - 1; // -1 because node will be counted twice

}
console.log("LBS of input arr is :- " + lbs([1, 11, 2, 10, 4, 5, 2, 1]));

// LPS -> Longest palindrome subseq
// TODO:- use memoization and reduce the number of calls
lps = function(arr) {
    var retVal;

    if (!arr) {
        return 0;
    }

    if (arr.length <= 1) {
        return arr.length;
    }

    if (arr[0] == arr[arr.length - 1]) {
        retVal = 2 + lps(arr.slice(1,-1));
    } else {
        retVal = maxVal(lps(arr.slice(1)),lps(arr.slice(0,-1)));
    }
    return retVal;
}

console.log("lps is :-" + lps("BBABCBCAB".split("")));
