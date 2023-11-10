const fs = require('fs');
const readline = require('readline');

const questions = [
  'What is the name of your project?',
  'Please provide a brief description of your project.',
  'Please provide installation instructions for your project.',
  'Please provide usage information for your project.',
  'Please provide contributions for your project.',
  'Please provide test instructions for your project.',
  'Please provide the license for your project.',
];

const titles = [
    `${process.argv[2]}`,
    '## Description',
    '## Installation',
    '## Usage',
    '## Contributions',
    '## Testing',
    '## License'
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function writeToFile(fileName, data, i) {

if (i === 0) {
    rl.question(`${questions[i]}\n`, (answer) => {
        fs.appendFile(fileName, `${titles[i]}\n`, (err) => {
            if (err) {
                console.error(err);
                  } else {
                  writeToFile(fileName, data, i + 1); // Move to the next question
             }
        });
});
  else if (i < questions.length) {
    rl.question(`${questions[i]}\n`, (answer) => {
        fs.appendFile(fileName, `${titles[i]}\n`, (err) => 
        err ? console.log(err) : null);

         fs.appendFile(fileName, `${answer}\n`, (err) => {
            if (err) {
           console.error(err);
             } else {
             writeToFile(fileName, data, i + 1); // Move to the next question
        }
      });
    });
  }; 
  else {
    console.log('README.md file created successfully.');
    rl.close();
  }
}
}

function init() {
  const fileName = 'README.md';
  fs.writeFile(fileName, '', (err) => {
    if (err) {
      console.error(err);
    } else {
      writeToFile(fileName, '', 0);
    }
  });
}

// Function call to initialize app
init();
