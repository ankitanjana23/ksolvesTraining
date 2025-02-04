const schedule = require('node-schedule');

const date = new Date(2025, 1, 4, 13,1 ,10); 

const job = schedule.scheduleJob(date, function(){
  console.log('Time for lunch!');
});

console.log('Server started')