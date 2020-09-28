/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const inquirer = require('inquirer');
const $4d = require('./node-4d');
// var settings = { host: '192.168.178.100', port: 19812, user: 'Rob Laveaux', password: 'laveaux' };
const settings = {
  host: 'localhost', port: 19812, user: 'odbc', password: 'odbc123',
};

const start = async () => {
  console.log('connecting to 4d...');
  const db = $4d.createConnection(settings);
  await new Promise((resolve, reject) => {
    try {
      db.connect(async (errors) => {
        if (errors) {
          reject(errors);
          return;
        }
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { sql } = await inquirer.prompt([{
      type: 'input',
      name: 'sql',
      message: 'type SQL to be run',
    }]);
    console.log(sql);

    try {
      await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        db.query(sql, [], (errors, results, fields) => {
          if (errors) {
            reject(errors);
            return;
          }
          // console.log(fields);
          try {
            console.log({ ...results, headers: 'not printed', fields: 'not printed' });
          } catch (error) {
            reject(error);
          }
          resolve();
        });
      });
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  }
};

start().then(() => {
  console.log('bye');
}).catch((error) => {
  console.log(error);
});
