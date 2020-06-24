import React from 'react';
import ReactDOM from 'react-dom';

import Tubiao from "../../component/tubiao"

function getdata(callback:any):any
{
    var xmlhttp:any;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET","last60s",true);
    xmlhttp.send();
}
function updatedata(callback:any):any
{
    var xmlhttp:any;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //console.log(xmlhttp.responseText);
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET","datafromdate",true);
    xmlhttp.send();
}

var sit;
var count=1;
window.onload=function(){
    var ans:any;
    getdata(function(data:any){
        ans=JSON.parse(data);
        console.log(ans.constructor==Array);
        /*console.log(ans.id);
        console.log(ans.oxygenValue);
        console.log(ans.date);*/
        ReactDOM.render(
            <Tubiao  arr={ans} sqlid={1}/>,
            document.getElementById("example")
        );
    });
    setInterval(function(){
        getdata(function(data:any){
        ans=JSON.parse(data);
        /*ans=ans.concat(JSON.parse(data));
        while (ans.length>60)
        {
            ans.shift();
        }*/
        /*ReactDOM.render(
            
            <Tubiao  arr={ans} sqlid={++count}/>,
            document.getElementById("example")
        )*/
    })
    },2000)
}


