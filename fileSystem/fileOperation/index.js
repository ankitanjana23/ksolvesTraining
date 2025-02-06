
/*
const fs = require('fs')

fs.writeFile('simple.txt' , 'hellow this is simple file' , (err)=>{
    if(err) throw err;
    console.log('file Created successfully')
})

fs.appendFile('simple2.txt' , 'hellow this file created using simple txt' , (err)=>{
    if(err) throw err;
    console.log('append file successfully')
})

fs.readFile('simple2.txt' , 'utf8' ,(err,data) =>{
    if(err) throw err;
    if(data) console.log("file content" , data);
});

// fs.unlink('simple2.txt' , (err)=>{
//     if(err) throw err;
//     console.log('file deleted successfully')
// })

console.log('hii')

*/
//Same work using async await 
const fs = require('fs').promises   //return res , rej state 

const handleFile = async() =>{
    try{
        await fs.writeFile('data.txt' , 'simple data file ')
        console.log('data file created successfully');

        const data = await fs.readFile('data1.txt' , 'utf-8' )
        console.log('data created' , data);

        await fs.rename('data.txt' , 'data2.txt' )
        console.log('successfully rename file')

    }catch(err) {
        console.log('error message ')
        console.error(err);
    }
     
}


handleFile()