var name = process.argv[2];

var total = 0;
var pos = 2;

var sum = function (arguments, pos) {
    if (pos < arguments.length) {
        total = total + parseInt(arguments[pos]);
        pos = pos + 1;
        sum(arguments, pos);
    }
};

sum(process.argv, pos);

console.log("The sum of " + process.argv + " is " + total);