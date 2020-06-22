import React from 'react';
import ReactDOM from 'react-dom';

import {Tubiao} from "../../component/tubiao"
import  Chart  from "chart.js";

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
            console.log(xmlhttp.responseText);
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET","last60s",true);
    xmlhttp.send();
}

window.onload=function(){
    var ans:any=1000;
    getdata(function(data:any){
        ans=JSON.parse(data);
        /*console.log(ans.id);
        console.log(ans.oxygenValue);
        console.log(ans.date);*/
        ReactDOM.render(
            <Tubiao  arr={ans}/>,
            document.getElementById("example")
        );
    });
    
    var mycanvas:HTMLCanvasElement=document.getElementById('myChart') as HTMLCanvasElement;
    var ctx:any =mycanvas.getContext('2d');

    var data={
        labels:ans.map((ele:any)=>ele.date),
        datasets:[
            {
            label: "OxygenConsentration",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: ans.map((ele:any)=>ele.oxygenValue)
            }
        ]

    }
    var opttion={};
    var myChart=new Chart(ctx,{
        type:'line',
        data:data,
        options:{}
    })

}


