'use strict';

const spawn = require('child_process').spawn;

const worker = process.argv[2];
const processes = parseInt(process.argv[3], 10);

for (let i = 0; i < processes; i++) {
  let workerProcess = spawn('node', [`./workers/${worker}/index.js`]);
  workerProcess.stderr.on('data', data => {
    console.log(`A ${worker} worker is erroring ${data.toString()}`);
  });

  workerProcess.stdout.on('data', data => {
    process.stdout.write(data.toString());
  });
}
