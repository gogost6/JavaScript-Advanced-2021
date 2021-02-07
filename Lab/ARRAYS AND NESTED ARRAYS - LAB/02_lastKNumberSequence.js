function solve(length, k) {
    let outputArr = [1];
    for(let i = 1; i < length; i++){
        outputArr[i] = sumLastK(outputArr, k);
    }

    return outputArr;
    
    function sumLastK(arr, k) {
        k = arr.length > k ? k : arr.length;
        let sum = 0;
        for(let i = 1; i <= k; i++){
            sum += arr[arr.length-i];
        }
        return sum;
    }
}
solve(6, 3)