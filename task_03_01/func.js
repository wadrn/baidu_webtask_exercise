window.onload = function(){
    function isASCII(ch){
        return ch.codePointAt(0) <=0xFF;
    }
    function getStrlen(str){
        var enlen =0;
        var zhlen =0;
        for(let ch of str){
            if(isASCII(ch)){
                enlen++;
            }else{
                zhlen++;
            }
        }
        return enlen + zhlen*2;
    }
    function isValidName(str){
        var len = getStrlen(str);
        if(len >=4 &&len<=16){
            return true;
        }
        return false;
    }
    function isValidPwd(pwd){
        var reg = new RegExp("^[a-zA-Z0-9]+$");
        var len =pwd.length;
        if(reg.test(pwd) &&len >=6 && len<=12){
            return true;
        }
        return false;
    }
    function isValidEmail(email){
        var eReg = new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$");
        if(eReg.test(email)){
            return true;
        }else{
            return false;
        }
    }
    function isValidPhone(phone){
        var reg = new RegExp("^[0-9]{11}");
        if(reg.test(phone)){
            return true;
        }
        return false;
    }
    var fullname = document.getElementById('fullname');
    var pwd =  document.getElementById('pwd');
     var agpwd = document.getElementById('agpwd');
     var email =  document.getElementById('email');
     var phone = document.getElementById('phone');
    var submit = document.getElementById('submit');
    function fullnameFocus(){
        var tip = fullname.nextElementSibling;
        tip.style.display = 'block';
    }
    function fullnameBlur(){
        var value =fullname.value;
        var tip = fullname.nextElementSibling;
        tip.style.display = 'block';
        if(isValidName(value)){
            tip.innerHTML = '输入格式正确';
            tip.style.color = 'green';
            fullname.style.borderColor ='green';
            return true;
        }else{
            tip.innerHTML= '输入格式错误';
            tip.style.color = 'red';
            fullname.style.borderColor ='red';
            return false;
        }
    }
    function pwdFocus(){
        var tip = pwd.nextElementSibling;
        tip.style.display ='block';
    }
    function pwdBlur(){
        var value = pwd.value;
        var tip = pwd.nextElementSibling;
        tip.style.display = 'block';
        if(isValidPwd(value)){
            tip.innerHTML = '密码可用';
            tip.style.color = 'green';
            pwd.style.borderColor ='green';
            return true;
        }else{
            tip.innerHTML= '密码输入不合法';
            tip.style.color = 'red';
            pwd.style.borderColor ='red';
            return false;
        }

    }
    function agpwdFocus(){
        var tip = agpwd.nextElementSibling;
        tip.style.display ='block';
    }
    function agpwdBlur(){
        var pwdValue = pwd.value;
        var agpwdValue = agpwd.value;
        var tip = agpwd.nextElementSibling;
        if(pwdValue.length ===0){
            tip.innerHTML ='密码不能为空';
            tip.style.color = 'red';
            agpwd.style.borderColor ='red';
            return false;
        }else if(pwdValue === agpwdValue){
            tip.innerHTML = '密码输入正确';
            tip.style.color = 'green';
            agpwd.style.borderColor ='green';
            return true;
        }else{
            tip.innerHTML = '两次密码输入不一致';
            tip.style.color = 'red';
            agpwd.style.borderColor ='red';
            return false;
        }
    }
    function emailFocus(){
        var tip = email.nextElementSibling;
        tip.style.display ='block';
    }
    function emailBlur(){
        var tip =email.nextElementSibling;
        var value = email.value;
        if(value.length ===0){
            tip.innerHTML ='邮箱不能为空';
            tip.style.color = 'red';
            email.style.borderColor ='red';
            return false;
        }else if(!isValidEmail(value)){
            tip.innerHTML ='邮箱格式错误';
            tip.style.color = 'red';
            email.style.borderColor ='red';
            return false;
        }else{
            tip.innerHTML ='邮箱可用';
            tip.style.color = 'green';
            email.style.borderColor ='green';
            return true;
        }
    }
    function phoneFocus(){
        var tip = phone.nextElementSibling;
        tip.style.display ='block';
    }
    function phoneBlur(){
        var tip = phone.nextElementSibling;
        var value =phone.value;
        if(value.length ===0){
            tip.innerHTML ='号码不能为空';
            tip.style.color = 'red';
            phone.style.borderColor ='red';
            return false;
        }else if(!isValidPhone(value)){
            tip.innerHTML ='号码格式不正确';
            tip.style.color = 'red';
            phone.style.borderColor ='red';
            return false;
        }else{
            tip.innerHTML ='号码可用';
            tip.style.color = 'green';
            phone.style.borderColor ='green';
            return true;
        }


    }
    function checkAll(){
        var nameFlag =fullnameBlur();
        var pwdFlag = pwdBlur();
        var agpwdFlag = agpwdBlur();
        var emailFlag = emailBlur();
        var phoneFlag = phoneBlur();
        if( nameFlag&&pwdFlag&&agpwdFlag&&emailFlag&&phoneFlag){
            alert("提交成功");
        }else{
            alert("提交失败");
        }
    }
    function initial(){
        fullname.addEventListener('focus',fullnameFocus);
        fullname.addEventListener('blur',fullnameBlur);
        pwd.addEventListener('focus',pwdFocus);
        pwd.addEventListener('blur',pwdBlur);
        agpwd.addEventListener('focus',agpwdFocus);
        agpwd.addEventListener('blur',agpwdBlur);
        email.addEventListener('focus',emailFocus);
        email.addEventListener('blur',emailBlur);
        phone.addEventListener('focus',phoneFocus);
        phone.addEventListener('blur',phoneBlur);
        submit.addEventListener('click',checkAll);
    }
    initial();
}
