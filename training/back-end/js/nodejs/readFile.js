var fs = require("fs");

var getFileContent = function (filePath) {
    return fs.readFileSync(filePath).toString();
};

var getFileLines = function (filePath) {
    return (fs.readFileSync(filePath).toString().split(/\r\n|\r|\n/g)).length;
};

//console.log("the content of the file", process.argv[2], "is");
//console.log(getFileContent(process.argv[2]));
//console.log(process.argv[2], "has ");
//console.log(getFileLines(process.argv[2]), " lines");

/**
 *
 * @param filePath
 * @param myCallBack
 */
var getFileContentAsync = function (filePath, myCallBack) {
    var cb = function (err, content) {
        if (err)
            console.log("Error ", filePath)

        myCallBack(undefined, content);
    };

    fs.readFile(filePath, cb);
};

console.log("the content of the file", process.argv[2], "is");
console.log(getFileContentAsync(process.argv[2], function (err, data) {
    console.log("tha fuck " + data.toString());
    console.log("I am done ");
}));

console.log("I am done 2");