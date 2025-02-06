const taskExcution = (task,timer) =>{
    //asynchrouns oper is non blocking move to another code 
    return new Promise((res,rej)=>{
    setTimeout(()=>
    {
        console.log(task)
        res()//promise resolve
    },timer);
    })
}

// taskExcution('pack your bag',3000)
// .then(()=>{return taskExcution('go for lunch',2000)})
// .then(()=>{return taskExcution('come back office',1000)})
// .then(()=>{return taskExcution('start working',2000)})
// .then(()=>{return console.log("all task completed successfully")})

async function task(){
    try{
       await taskExcution('go for lunch',2000)
       await taskExcution('come back office',1000)
       await taskExcution('start working',2000)
       await console.log("all task completed successfully")
    }catch(err){
        console.error(err);
    }
}

task();
