function Event(){
    this.events ={};
}
Event.prototype.on =function(attr,callback){
        if(this.events[attr]){
            this.events[attr].push(callback);
        }else{
            this.events[attr] = [callback];
        }
    }
Event.prototype.off=function(attr){
    for(let key in this.events){
        if(this.events.hasOwnProperty(key) && key ===attr){
            delete this.events[key];
        }
    }
}
Event.prototype.emit=function(attr,...arg){
        this.events[attr] && this.events[attr].forEach(function(item){
            item(...arg);
        });
    }
function Observer(data){
    this.data =data;
    this.makeObserver(data);
    this.eventBus = new Event();
}
Observer.prototype.setterAndgetter = function(key,val){
    let that = this;
    Object.defineProperty(this.data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log('你访问了'+key);
            return val;
        },
        set:function(newVal){
            console.log('你设置了'+key);
            console.log('新的'+key +'=' + newVal);
            that.eventBus.emit(key,newVal);
            val = newVal;
            if(typeof newVal ==='object'){
                new Observer(val);
            }
        }
    })
}
Observer.prototype.makeObserver =function(obj){
    let val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
                val = obj[key];
                if(typeof val === 'object'){
                    new Observer(val);
                }
        }
        this.setterAndgetter(key,val);
    }
}
Observer.prototype.$watch = function(attr,callback){
    this.eventBus.on(attr,callback);
}
let app = new Observer({
    name:{
        firstname:'ruining',
        lastname:'dong'
    },
    age:23,
    university:'bupt',
    address:'haidian Beijing'
});
app.$watch('age',function(newVal){
    console.log('我的年龄变了');
});
app.$watch('name',function(newVal){
    console.log('我改名字了');
});
