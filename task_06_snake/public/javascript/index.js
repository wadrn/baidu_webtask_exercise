require('../stylesheet/style.css');
require('../../index.html')
import $ from 'jquery';
var initState;
var mySnake;
var myFood;
var moveTimer;
var eatTimer;
var loseTimer;
function createMap(row,col){
    for(var i=1;i<=row;i++){
        var tr = $("<tr></tr>");
        for(var j=1;j<=col;j++){
            var td = $("<td></td>");
            td.attr('id',i+"-"+j);
            td.appendTo(tr);
        }
        tr.appendTo($('#tbody'));
    }
}
function generateFoodId(){
    var foodX =Math.ceil(Math.random()*30);
    var foodY = Math.ceil(Math.random()*30);
    var foodId = {
        x:foodX,
        y:foodY
    };
    return foodId;
}
function createFood(){
    var foodId = generateFoodId();
    while($('#'+foodId.x+'-'+foodId.y).attr('class') === 'snakebody' || $('#'+foodId.x+'-'+foodId.y).attr('class') === 'snakehead'){
        foodId =generateFoodId();
    }
    $('#'+foodId.x+'-'+foodId.y).addClass('food');
    return foodId;
}
// function create2dArr(width,height){
//     var arr =new Array(width);
//     for(var i=0;i<width;i++){
//         arr[i] = new Array(height);
//         for(var j=0;j<height;j++){
//             arr[i][j]=0;
//         }
//     }
//     return arr;
// }
function initial(){
    var mySnake =new Snake();
    var pos ={
        x:15,
        y:15
    };
    var snakeLength = 4;
    for(var i=0;i<snakeLength;i++){
        mySnake.bodyArr.push(pos);
        $('#'+pos.x+'-'+pos.y).addClass('snakebody');
        var newX = pos.x -1;
        var newY = pos.y;
        pos ={
            x:newX,
            y:newY
        };
    }
    var foodId = createFood();
    return {
        snake:mySnake,
        food:foodId
    };
};
function Snake(){
    this.snakedir ='down';
    this.bodyArr=[];
    // this.position = create2dArr(30,30);
};
function start(){
    if($('#lose').css('display') === 'block'){
        $('#lose').css('display','block');
    }
    if(mySnake){
        mySnake.dead();
    }
    if(myFood){
        $('#'+myFood.x+'-'+myFood.y).removeClass('food');
    }
    initState =initial();
    mySnake = initState.snake;
    myFood = initState.food;
    moveTimer = setInterval(function(){
        mySnake.move('along');
    },500);
    eatTimer = setInterval(function(){
        mySnake.eat(myFood);
        if($('#'+myFood.x+'-'+myFood.y).attr('class')!=='food'){
            myFood = createFood();
        }
    },100);
    loseTimer = setInterval(function(){
        if(mySnake.collide()){
            clearInterval(moveTimer);
            clearInterval(eatTimer);
            clearInterval(loseTimer);
            $('#lose').css('display','block');
        }
    },100)
}
function stop(){
    clearInterval(moveTimer);
    clearInterval(eatTimer);
    clearInterval(loseTimer);
}
Snake.prototype.setBodyArr =function(dx,dy){
    var newX = this.bodyArr[0].x +dx;
    var newY = this.bodyArr[0].y +dy;
    var tmp = this.bodyArr.pop();
    this.bodyArr.unshift({
        x:newX,
        y:newY
    });
};
Snake.prototype.setSnakeDir =function(dir){
    this.snakedir = dir;
}
Snake.prototype.move = function(dir){
    switch(dir){
        case 'up':
         for(var i=0;i<this.bodyArr.length;i++){
             $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).removeClass('snakebody');
         }
         if(this.snakedir === 'left'){
             this.setBodyArr(-1,0);
             this.setSnakeDir('up');
         }else if(this.snakedir === 'right'){
             this.setBodyArr(-1,0);
             this.setSnakeDir('up');
         }
          for(var i=0;i<this.bodyArr.length;i++){
              $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).addClass('snakebody');
          }
          break;
        case 'left':
        for(var i=0;i<this.bodyArr.length;i++){
            $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).removeClass('snakebody');
        }
        if(this.snakedir === 'down'){
            this.setBodyArr(0,-1);
            this.setSnakeDir('left');
        }else if(this.snakedir === 'up'){
            this.setBodyArr(0,-1);
            this.setSnakeDir('left');
        }
         for(var i=0;i<this.bodyArr.length;i++){
             $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).addClass('snakebody');
         }
         break;
         case 'right':
         for(var i=0;i<this.bodyArr.length;i++){
             $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).removeClass('snakebody');
         }
         if(this.snakedir === 'down'){
             this.setBodyArr(0,1);
             this.setSnakeDir('right');
         }else if(this.snakedir === 'up'){
             this.setBodyArr(0,1);
             this.setSnakeDir('right');
         }
          for(var i=0;i<this.bodyArr.length;i++){
              $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).addClass('snakebody');
          }
          break;
          case 'down':
           for(var i=0;i<this.bodyArr.length;i++){
               $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).removeClass('snakebody');
           }
           if(this.snakedir === 'left'){
               this.setBodyArr(1,0);
               this.setSnakeDir('down');
           }else if(this.snakedir === 'right'){
               this.setBodyArr(1,0);
               this.setSnakeDir('down');
           }
            for(var i=0;i<this.bodyArr.length;i++){
                $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).addClass('snakebody');
            }
            break;
            case 'along':
             for(var i=0;i<this.bodyArr.length;i++){
                 $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).removeClass('snakebody');
             }
             if(this.snakedir === 'down'){
                 this.setBodyArr(1,0);
             }else if(this.snakedir === 'up'){
                 this.setBodyArr(-1,0);
             }else if(this.snakedir === 'left'){
                 this.setBodyArr(0,-1);
             }else if(this.snakedir === 'right'){
                 this.setBodyArr(0,1);
             }
              for(var i=0;i<this.bodyArr.length;i++){
                  $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).addClass('snakebody');
              }
              break;

    }
}
Snake.prototype.eat =function(foodId){
    var headPos  = {
        x:this.bodyArr[0].x,
        y:this.bodyArr[0].y
    };
    if(headPos.x === foodId.x && headPos.y ===foodId.y){
        $('#'+foodId.x+'-'+foodId.y).removeClass('food');
        this.bodyArr.push(foodId);
    }

}
Snake.prototype.collide =function(){
    var headPos  = {
        x:this.bodyArr[0].x,
        y:this.bodyArr[0].y
    };
    if(headPos.x ==1 || headPos.x ==30 || headPos.y ==1 || headPos.y ==30){
        return true;
    }else{
        return false;
    }
}
Snake.prototype.dead = function(){
    for(var i=0;i<this.bodyArr.length;i++){
        $('#'+this.bodyArr[i].x+'-'+this.bodyArr[i].y).removeClass('snakebody');
    }
    this.bodyArr.length =0;
}
$(function(){
    createMap(30,30);
    $('#start').click(function(){
        start();
    });
    $('#stop').click(function(){
        stop();
    });
    $('#restart').click(function(){
        $('#lose').css('display','none');
        start();
    });
    $('#cancel').click(function(){
        $('#lose').css('display','none');
    })
    $(document).keydown(function(e){
        if(e.keyCode === 37){
            mySnake.move('left');
        }else if(e.keyCode ===38){
            mySnake.move('up');
        }else if(e.keyCode === 39){
            mySnake.move('right');
        }else if(e.keyCode === 40){
            mySnake.move('down');
        }
    });
});
