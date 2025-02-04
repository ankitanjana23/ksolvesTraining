we are using proccess manager to store our task and excute at specific time 
its important to write process.exit() otherwise continue displaying messages 


npm install -g pm2
 
1) start the script using pm2 
pm2 start index.js --name "cron-job"

2) The script will send the email at 1:00 PM and exit immediately.
To restart it automatically for the next day, add this to crontab

crontab -e

3) 
0 12 * * * pm2 start cron-job

manually start and stop job 

pm2 stop cron-job
pm2 restart cron-job
pm2 logs cron-job