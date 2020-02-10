const fs = require("fs");
const path = require("path");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

// the question() method shows the first parameter (a question) and waits for the user input. It calls the callback function once enter is pressed
readline.question(`Enter the path: `, path => {
  const files = findFiles(path);
  console.log(files);
  readline.close();
});

const findFiles = pathName => {
  try {
    let results = [];
    const fileExists = fs.existsSync(pathName);
    if (!fileExists) {
      throw new Error("File does not exists");
    }
    const list = fs.readdirSync(pathName).map(fileName => {
      return path.join(pathName, fileName);
    });
    list.forEach(data => {
      let stat = fs.statSync(data);
      if (!stat) {
        throw new Error("Something went wrong");
      }
      if (stat && stat.isDirectory()) {
        // Recursive into a subdirectory
        results = results.concat(findFiles(data));
      } else {
        // Is a file
        results.push(data);
      }
    });
    return results;
  } catch (error) {
    console.log("Error occurred\n", error.message);
  }
};
