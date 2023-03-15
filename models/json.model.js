const APIResponse={
    success:(data,msg)=>{
        return {
            status:true,
            message:msg?msg:'success',
            data:data
        }
    },
    error:(msg)=>{
        return {
            status:false,
            message:msg?msg:'error'
        }
    }
}

export {APIResponse}