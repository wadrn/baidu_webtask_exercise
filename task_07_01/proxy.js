function Observer(data){
    return  new Proxy(data,{
        get:function(target,key){
            if(key in target){
                console.log();
                return target[key];
            }else{
                throw new Error('key does not exist');
            }
        },
        set:function(target,key,newVal){
            console.log('你设置了' + key);
            console.log('新的' + key +'=' + newVal);
            target[key] =newVal;
        }
    })
}
let my= new Observer({
    name:'doreen',
    age:'22',
    address:'beijing'
})
