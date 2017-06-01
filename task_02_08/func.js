window.onload = function(){
    var divList;
    var container = document.getElementById('container');
    var lookup = document.getElementById('search');
    var iterator = document.getElementById('iterator');
    var flag =false;
    function dfs(node){
        divList.push(node);
        if(node.children.length!== 0){
            for(var i=0;i<node.children.length;i++){
                dfs(node.children[i]);
            }
        }
    }
    function search(target){
        var i=0;
        divList[i].style.backgroundColor ="green";
         timer = setInterval(function(){
            i++;
            if(target == divList[i].firstChild.nodeValue){
                clearInterval(timer);
                divList[i-1].style.backgroundColor ="white";
                divList[i].style.backgroundColor ="green";
            }else{
                if(i == divList.length){
                    clearInterval(timer);
                    divList[i-1].style.backgroundColor ="white";
                }else{
                    divList[i-1].style.backgroundColor ="white";
                    divList[i].style.backgroundColor = "green";
                }
            }
        },300);
    }
    function hasClass(cla,ele){
        if(ele.className.trim().length ===0){
            return false;
        }
        var allClass = ele.className.trim().split(" ");
        return allClass.indexOf(cla) !==-1;
    }
    function addClass(cla,ele){
        if(!hasClass(cla,ele)){
            ele.className = ele.className +" " + cla;
        }
    }
    function removeClass(cla,ele){
        if(hasClass(cla,ele)){
            var reg = new RegExp('(\\s|^)'+cla+'(\\s|$)');
            ele.className =ele.className.replace(reg,' ');
        }
    }
    function clearClass(cla){
        divList.forEach(function(item){
            removeClass(cla,item);
        })
    }
    function helper(i){
        return function(e){
            if(hasClass('select',divList[i])){
                removeClass('select',divList[i]);
                e.stopPropagation();
            }else{
                addClass('select',divList[i]);
                e.stopPropagation();
            }
        }

    }
    function deleteNodes(node){
        var children = node.childNodes;
        for(var i=0;i<children.length;i++){
            children[i].remove();
        }
    }
    function bindDivClickEvent(list){
        list.forEach(function(item,index){
            item.addEventListener('click',helper(index));
        })
    };
    // function clearDivClickEvent(list){
    //     list.forEach(function(item,index){
    //         item.removeEventListener('click',helper(index));
    //     })
    // };
    function initial(){
        divList =[];
        root = container.children[0];
        dfs(root);
        bindDivClickEvent(divList);
    }
    iterator.onclick = function(){
        var i=0;
        divList[i].style.backgroundColor ="green";
         timer = setInterval(function(){
            i++;
            if(i == divList.length){
                clearInterval(timer);
                divList[i-1].style.backgroundColor ="white";
            }else{
                divList[i-1].style.backgroundColor ="white";
                divList[i].style.backgroundColor = "green";
            }
        },300);
    }
    lookup.onclick =function(){
        var value = document.getElementById('input').value;
        dfs(root);
        search(value);
    }
    deleteNode.onclick = function(){
        divList.forEach(function(item){
            if(item.className.indexOf('select')!==-1){
                item.remove(this);
            }
        });
        clearClass('select');
    }
    addNode.onclick =function(){
        var nodeValue = document.getElementById('newNode').value;
        var div = document.createElement('div');
        var divTxt = document.createTextNode(nodeValue);
        div.appendChild(divTxt);
        div.onclick = function(e){
            if(hasClass('select',this)){
                removeClass('select',this);
                e.stopPropagation();
            }else{
                addClass('select',this);
                e.stopPropagation();
            }
        }
        divList.forEach(function(item){
            if(item.className.indexOf('select')!==-1){
                item.appendChild(div);
            }
        });
        clearClass('select');
    }
    initial();
}
