import React from "react"

import  Chart  from "chart.js";

interface datanode{
    date:string,
    value:number
}
export interface HelloProps {
    arr:datanode[],
    sqlid:number
}

var mycanvas:HTMLCanvasElement=document.getElementById('myChart') as HTMLCanvasElement;
var ctx:any =mycanvas.getContext('2d');


export default class Tubuiao extends React.Component<HelloProps>
{
    render(){
        console.log(this.props.sqlid);
    var dataset={
        labels:this.props.arr.map((ele:any)=>ele.date),
        datasets:[
            {
            label: "OxygenConsentration",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: this.props.arr.map((ele:any)=>{return {x:ele.date,y:ele.oxygenValue}})
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
        return <canvas id= "myChart"></canvas>
    }

}

