function reverseStr(arr, n) {
    for (let i = arr.length - 1; i >= 0; i--) {
        console.log(i);
        for (let j = 0; j< arr.length; j++) {
            console.log(j);
        }
    }
    return arr;
}

var arr = [8 ,9, 10, 23232];
reverseStr(arr, 4);
