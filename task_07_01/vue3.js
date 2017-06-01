function Event(){
    this.events = {};
}
Event.prototype.on =function(attr,callback){
    if(this.events[attr]){
        this.events[attr].push(callback);
    }else{
        this.events[attr] = [callback];
    }
}
Event.prototype.off = function(attr){
    if(this.events[attr]){
        delete this.events[attr];
    }
}
Event.prototype.emit = function(attr,...args){
    if(this.events[attr]){
        this.events[attr].forEach(function(item){
            item(...args);
        });
    }
}
function Observer(data,parent){
    this.data =data;
    this.parent = parent;
    this.parentAttr =Array.prototype.slice.call(arguments,2)[0] || 'data';
    this.makeObserver(data);
    this.eventBus = new Event();
}
Observer.prototype.makeObserver =function(obj){
    var val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            val = obj[key];
            if(typeof val ==='object'){
                new Observer(val,obj,this.parentAttr +'.'+key);
            }
        }
        this.defineProperties(key,val)
    }
}
Observer.prototype.defineProperties = function(key,val){
    let that =this;
    Object.defineProperty(this.data,key,{
        configurable:true,
        enumerable:true,
        get:function(){
            console.log('你访问了' +key);
            return val;
        },
        set:function(newVal){
            console.log('你设置了'+key);
            console.log(that);
            that.eventBus.emit(key,newVal);
            var parents = that.parentAttr.split('.');

            parents.forEach(function(item){
                var p = that.parent;
                console.log(p);
                p.eventBus.emit(item,newVal);
            });
            val = newVal;
            if(typeof newVal === 'Object'){
                new Observer(newVal);
            }
        }
    })
}
Observer.prototype.watch = function(attr,callback){
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
app.watch('age',function(newVal){
    console.log('我的年龄变了,是' + newVal);
});
app.watch('name',function(newVal){
    console.log('我改名字了,可能是姓氏也可能是名字');
});
