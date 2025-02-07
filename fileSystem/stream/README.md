using fs.readFile() take too much time 

1000mb file --> fs read file (1gb) --> nodejs store this data (1gb) --> than brwoser display 

assume we have 100 users 100*1  = 100GB our node js has data limitation (solution stream)

node --trace-uncaught  node gives this error memory consumption 

stream divide large amount of data into chunks 

stream is method to move data from source to distenation chunks by chunks

