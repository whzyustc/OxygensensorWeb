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
    var ans:any;
    getdata(function(data:any){
        ans=JSON.parse(data);
        console.log(ans.constructor==Array);
        /*console.log(ans.id);
        console.log(ans.oxygenValue);
        console.log(ans.date);*/
        ReactDOM.render(
            <Tubiao  arr={ans}/>,
            document.getElementById("example")
        );
        
    var mycanvas:HTMLCanvasElement=document.getElementById('myChart') as HTMLCanvasElement;
    var ctx:any =mycanvas.getContext('2d');

    var dataset={
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
            data: ans.map((ele:any)=>{return {x:ele.date,y:ele.oxygenValue}})
            }
        ]

    }
    var option={
        scales: {
        yAxes: [{
            ticks: {
                max: 1000,
                min: 200,
                stepSize: 100
            }
        }],

        xAxes: [{
            type: 'time',
            time: {
                displayFormats: {
                    quarter: 'h:mm:ss a'
                }
            }
        }]
    }};
    var myChart=new Chart(ctx,{
        type:'line',
        data:dataset,
        options:option
    })
    });
    

}


