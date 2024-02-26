import fs from "fs";
import os from "os";
import { exec } from "child_process";

const logFilePath = "activityMonitor.log";

const commands = {
    linux: "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1",
    darwin: "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1",
    win32:
        'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"',
};

const getProcessDetails = () => {
    const platform = os.platform();
    const command = commands[platform];

    if (!command) {
        throw new Error(`Unsupported platform: ${platform}`);
    }

    return command;
};

const writeToLogFile = log => {
    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            throw new Error('Error during the save');
        }
    });
};

const printCommand = (command) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(command);
};

const execProcess = (command) => {
    const timer = 60;
    const refreshRate = 0.1;
    let commandOutput = ''

    setInterval(() => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`STDERR: ${stderr}`);
                return;
            }
        
            commandOutput = stdout.trim();
            printCommand(commandOutput);
        });
    }, 1000 * refreshRate);
    
    setInterval(() => {
        const unixTime = Math.floor(Date.now() / 1000);

        writeToLogFile(`${unixTime} : ${commandOutput} \n`);
    }, 1000 * timer);
};

const monitorActivity = () => {
    const command = getProcessDetails();

    execProcess(command);
};

monitorActivity();