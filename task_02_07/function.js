var timer;
function changeColor(node){
    node.style.backgroundColor = "white";
    var pretimer1 = setTimeout(function(){
        node.style.backgroundColor = "blue";
    },timer+=500);
    var pretimer2 = setTimeout(function(){
        node.style.backgroundColor = "white";
    },timer+=500);
}
function preorder(root){
    if(root){
        changeColor(root);
        preorder(root.firstElementChild);
        preorder(root.lastElementChild);
    }
}
function inorder(root){
    if(root){
        inorder(root.firstElementChild);
        changeColor(root);
        inorder(root.lastElementChild);
    }
}
function postorder(root){
    if(root){
        postorder(root.firstElementChild);
        postorder(root.lastElementChild);
        changeColor(root);
    }
}
var preorderBtn = document.getElementById('preorder');
var inorderBtn =document.getElementById('inorder');
var postorderBtn = document.getElementById('postorder');
var root = document.getElementById('root');
window.onload = function(){
    preorderBtn.onclick = function(){
        timer =0;
        preorder(root);
    }
    inorderBtn.onclick = function(){
        timer =0;
        inorder(root);
    }
    postorderBtn.onclick = function(){
        timer=0;
        postorder(root);
    }
}



// var orderQueue = [];
// var inAnimation = false;
//
// //先序遍历
// function preOrder(root) {
//   orderQueue.push(root);
//   if (root.firstElementChild != null)
//     preOrder(root.firstElementChild);
//   if (root.lastElementChild != null)
//     preOrder(root.lastElementChild);
// }
//
// //中序遍历
// function inOrder(root) {
//   if (root.firstElementChild != null)
//     inOrder(root.firstElementChild);
//   orderQueue.push(root);
//   if (root.lastElementChild != null)
//     inOrder(root.lastElementChild);
// }
//
// //后续遍历
// function postOrder(root) {
//   if (root.firstElementChild != null)
//     postOrder(root.firstElementChild);
//   if (root.lastElementChild !== null)
//     postOrder(root.lastElementChild);
//   orderQueue.push(root);
// }
//
// function render() {
//   if (inAnimation) {
//     alert('in animation');
//     return;
//   }
//
//   inAnimation = true;
//   var i = 0;
//   orderQueue[i].style.backgroundColor = 'blue';
//   var showRet = setInterval(function() {
//     i++;
//     if (i >= orderQueue.length) {
//       clearInterval(showRet);
//       orderQueue[orderQueue.length - 1].style.backgroundColor = '#fff';
//       inAnimation = false;
//       return;
//     }
//     orderQueue[i - 1].style.backgroundColor = '#fff';
//     orderQueue[i].style.backgroundColor = 'blue';
//   }, 500);
// }
//
// var rootNode = document.getElementById("root");
// window.onload = function() {
//   //按钮绑定事件
//   document.getElementById('preorder').onclick = function() {
//     preOrder(rootNode);
//     render();
//   }
//
//   document.getElementById('inorder').onclick = function() {
//     inOrder(rootNode);
//     render();
//   }
//
//   document.getElementById('postorder').onclick = function() {
//     postOrder(rootNode);
//     render();
//   }
// }
