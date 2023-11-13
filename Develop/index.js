const fs = require('fs');
const readline = require('readline');
const inquirer = require('inquirer');

const questions = [
    'Please provide a brief description of your project.',
    'Please provide installation instructions for your project.',
    'Please provide usage information for your project.',
    'Please provide contributions for your project.',
    'Please provide test instructions for your project.',
];

const titles = [
    '### Description',
    '### Installation',
    '### Usage',
    '### Contributions',
    '### Testing',
];

const fileName = 'README.md';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const contents =
    `<details>
<summary>Table of Contents</summary>
<ol>
  <li><a href="#description">Description</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contributions">Contributions</a></li>
  <li><a href="#testing">Testing</a></li>
  <li><a href="#questions">Questions</a></li>
  <li><a href="#license">License</a></li>
</ol>
</details>
`

function init() {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.error(err);
        } else {

            console.log(`Please name your project`);
            rl.question('Project Name: ', (answer) => {
                fs.appendFile(fileName, `# ${answer}\n`, (err) => {
                    if (err) throw err;

                    fs.appendFile(fileName, `${contents}\n`, (err) => {
                        if (err) throw err
                        writeToFile(fileName, '', 0);
                    });
                });
            })

        };
    });
}
function writeToFile(fileName, data, i) {
    if (i < questions.length) {
        console.log(`${questions[i]}`);
        rl.question('Your answer: ', (answer) => {
            fs.appendFile(fileName, `${titles[i]}\n${answer}\n`, (err) => {
                if (err) throw err;
                // Move to the next question
                writeToFile(fileName, '', i + 1);
            });
        });
    } else {
        // All questions answered, move to the GitHub username input
        writeGithub();
    }
}

function writeGithub() {
    fs.appendFile(fileName, '## Questions\n', (err) => {
        if (err) throw err;
        console.log('Please enter your GitHub username:');
        rl.question('Your User: ', (githubAnswer) => {
            fs.appendFile(
                fileName,
                `GitHub: https://www.github.com/${githubAnswer}\n`,
                (err) => {
                    if (err) throw err;
                    // Move to the email input
                    writeEmail();
                }
            );
        });
    });
}

function writeEmail() {
    console.log('Please enter your email:');
    rl.question('Your Email: ', (emailAnswer) => {
        fs.appendFile(fileName, `Email: ${emailAnswer}\n`, (err) => {
            if (err) throw err;
            // Close the readline interface after collecting both GitHub username and email
            rl.close();
            fs.appendFile(fileName, `To ask the developers any questions relating to this project, please contact via email.\n`, (err) => {
                if (err) throw err;
                selectLicense();
            })
            // Move to selecting the license
        });
    });
}

function selectLicense() {
    fs.appendFile(fileName, '## License\n', (err) => {
        if (err) throw err;
        licenseChoices();
    });
}

function licenseChoices() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What kind of license would you like?',
                choices: ['MIT', 'GPLv3'],
                name: 'license',
            },
        ])
        .then((response) => {
            switch (response.license) {
                case 'MIT':
                    fs.appendFile(
                        fileName,
                        'This project is licensed under the MIT License.\n',
                        (err) => {
                            if (err) throw err;
                        }
                    );
                    break;
                case 'GPLv3':
                    fs.appendFile(
                        fileName,
                        'This project is licensed under the GNU GPL v3.\n',
                        (err) => {
                            if (err) throw err;
                        }
                    );
                    break;
            }
        });
}

// Function call to initialize app
init();
