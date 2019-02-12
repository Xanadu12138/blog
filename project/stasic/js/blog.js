var xmlhttp;
var state=3;
var username;
var password;
function loadXMLDoc(url) {
    xmlhttp = null;
    //alert(method1);
    if (window.XMLHttpRequest) { // code for all new browsers
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // code for IE5 and IE6
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = state_Change;
        xmlhttp.open("POST", url, true);


        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //alert(username);
        if(state !=3){
        xmlhttp.send("username=" + username + "&password=" + password);}
        if(state ==3){
            xmlhttp.send(null);
        }

    } else {
        alert("Your browser does not support XMLHTTP.");
    }
}

function state_Change() {
    
    if (xmlhttp.readyState == 4) { // 4 = "loaded"
        if (xmlhttp.status == 200 && state ==2) { // 200 = OK
            var signa = xmlhttp.responseText;
            var signajson = JSON.parse(signa);
            alert(signajson.msg);
        } else if (xmlhttp.status == 200 && state == 1) {
            var signb = xmlhttp.responseText;
            var signbjson = JSON.parse(signb);
            if (signbjson.errcode == 1) {
                alert(signbjson.msg);
            } else if (signbjson.errcode == 2) {
                alert(signbjson.msg);
            } else if (signbjson.errcode == 0) {
                alert(signbjson.msg);
                var bdiv = document.getElementById("bdiv");
                bdiv.style.setProperty('display', 'none');
                var signdiv = document.getElementById("signdiv");
                signdiv.style.setProperty('display', 'none');
                var parent = document.getElementById("container");
                var child = document.getElementById("but");
                parent.removeChild(child);
                var selfinfo = document.createElement("div");
                selfinfo.className = "selfinfo";
                parent.appendChild(selfinfo)
                var selfimg = document.createElement("i");
                selfimg.className = "selfimg";
                //selfimg.style.background="url("+signbjson.imgUrl+")";
                selfinfo.appendChild(selfimg);
                var selfname = document.createElement("a");
                selfname.innerHTML = username;
                selfinfo.appendChild(selfname);
            }
        }else if(xmlhttp.status == 200 && state ==3){
            var com=xmlhttp.responseText;
            var comjason=JSON.parse(com);
            var tbody = document.getElementById("tb");
            for(var i = 0;i < comjason.length; i++){ //遍历一下json数据
                var trow = getDataRow(comjason[i]); //定义一个方法,返回tr数据 
                tbody.appendChild(trow);

            } 
            
        } 
        else {
            alert("Problem retrieving XML data");
        }
    }
}

function sign() {
    var bdiv = document.getElementById("bdiv");
    bdiv.style.setProperty('display', 'block');
    var signdiv = document.getElementById("signdiv");
    signdiv.style.setProperty('display', 'block');
}
function clearbox() {
    var bdiv = document.getElementById("bdiv");
    bdiv.style.setProperty('display', 'none');
    var signdiv = document.getElementById("signdiv");
    signdiv.style.setProperty('display', 'none');
  
  }
function signin(){
    username = document.getElementById("user").value;
    password = document.getElementById("password").value;
    //alert(username + password);
    state = 1;
    var url = "http://www.zhengchengfeng.cn:8080/login";
    //alert(url);
    if (username != "" && password != "") {
      loadXMLDoc(url);
    } else {
      alert("请输入用户名和密码");
    }
  
}
function signup(){
    username = document.getElementById("user").value;
    password = document.getElementById("password").value;
    //alert(username + password);
    state = 2;
    var url = "http://www.zhengchengfeng.cn:8080/addUser";
    //alert(url);
    if (username != "" && password != "") {
      loadXMLDoc(url);
    } else {
      alert("请输入用户名和密码");
    }
}  
function getDataRow(h){  
         var row = document.createElement('tr'); //创建行  
           
         var idCell = document.createElement('td'); //创建第一列id  
         idCell.innerHTML = h.id; //填充数据  
         row.appendChild(idCell); //加入行  ，下面类似  
           
         var nameCell = document.createElement('td');//创建第二列name  
         nameCell.innerHTML = h.name;  
         row.appendChild(nameCell);  
           
         var jobCell = document.createElement('td');//创建第三列job  
         jobCell.innerHTML = h.job;  
         row.appendChild(jobCell);  
}