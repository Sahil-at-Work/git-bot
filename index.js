const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const { Random } = require("random-js");

const FILE_PATH = "/data.json";
const random = new Random(); // Create a Random instance

const makeCommit = (n) => {
    if (n <= 0) {
        return simpleGit().push();
    }

    const x = random.integer(0, 54); // Use correct function
    const y = random.integer(0, 6);

    const DATE = moment()
        .subtract(1, 'y')
        .add(1, 'd')
        .add(x, 'w')
        .add(y, 'd')
        .format();

    const data = { date: DATE };

    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit()
            .add([FILE_PATH])
            .commit(DATE, { '--date': DATE }, () => {
                makeCommit(n - 1);
            });
    });
};

makeCommit(100);
