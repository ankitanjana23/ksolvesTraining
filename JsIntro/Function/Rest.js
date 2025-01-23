function func(value , ...number){
    console.log(value,"first Element");
    number.map((item,idx)=> {
        console.log(item , idx );
    })
}

func(5,7,8,9,"ankit" , "vijay")