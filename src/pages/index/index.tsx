// import React from 'react';
// import ReactDOM from 'react-dom';
import Chart from 'chart.js'
import {  } from 'jquery';

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
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET","datafromdate",true);
    xmlhttp.send();
}

var sit;
var count=1;
var mycanvas:HTMLCanvasElement=document.getElementById('myChart') as HTMLCanvasElement;
var ctx:any =mycanvas.getContext('2d');
var oxygendata:number[]=[];
 var dataset={
        datasets:[
            {
            label: "OxygenConcentration",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: oxygendata
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
        }],
        animation:{
            duration:0
        }

    }};
window.onload=function(){
    var ans:any;
    var myChart=new Chart(ctx,{
        type:'line',
        data:dataset,
        options:option
    })
    getdata(function(data:any){
        ans=JSON.parse(data);
        dataset.datasets[0].data=ans.map((item: { date: any; oxygenValue: any; })=>{return {x:item.date,y:item.oxygenValue}})
        myChart.update();
    });
    setInterval(function(){
        getdata(function(data:any){
        ans=JSON.parse(data);
        dataset.datasets[0].data=ans.map((item: { date: any; oxygenValue: any; })=>{return {x:item.date,y:item.oxygenValue}})
        myChart.update();
    })
    },1000)
}


