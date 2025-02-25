const { exec } = require("child_process");
const cron = require("node-cron");

const SCRIPT_TO_RUN = "node index.js"; // Command to execute your commit script

// Function to execute the script
const runScript = () => {
    console.log("Running commit script...");
    exec(SCRIPT_TO_RUN, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return;
        }
        console.log(`Script output: ${stdout}`);
    });
};

// Schedule the script twice a day (10:00 AM and 6:00 PM)
cron.schedule("0 10,18 * * *", () => {
    console.log(`Executing script at ${new Date().toLocaleString()}`);
    runScript();
});

console.log("Scheduler running. The script will execute at 10:00 AM & 6:00 PM daily.");
