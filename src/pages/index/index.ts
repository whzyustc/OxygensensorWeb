import  Chart  from "chart.js";
interface IData{
    id:number;
    date:string;
    oxygenValue:number;
}
function getdata(router:string,callback:any,query:string=null):any
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
    xmlhttp.open("GET",router+'?'+query,true);
    xmlhttp.send();
}
var timer:any;
var lastid:number;

window.onload=function(){
    var ans:IData[];
    
    var dataset:any;
    var mycanvas:HTMLCanvasElement;
    var ctx:any;
    var option:any;
    var myChart:any;
    getdata("last60s",function(data:string){
        ans=JSON.parse(data);

        console.log(ans.constructor==Array);
            
        lastid=ans[ans.length-1].id;
        console.log("lastid:",lastid);
        console.log(lastid);
        mycanvas=document.getElementById('myChart') as HTMLCanvasElement;
        ctx =mycanvas.getContext('2d');

        dataset={
        labels:ans.map((ele:any)=>ele.date),
        datasets:[
            {
            label: "OxygenConcentration",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: ans.map(value=>{return {x:value.date,y:value.oxygenValue}})
            }
        ]

    }
    option={
        
        scales: {
        yAxes: [{
            ticks: {
                min: 0,
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
    myChart=new Chart(ctx,{
        type:'line',
        data:dataset,
        options:option
    })

    });
    

    timer=setInterval(function(){
        if (lastid!=undefined)
        getdata("datafromid",function(data:string){

        let tmp:IData[]=JSON.parse(data);
        console.log(lastid)
        if (tmp.length>0)
        {
            
        lastid=tmp[tmp.length-1].id;
        console.log("lastid:",lastid);

        tmp.map(value=>{
            ans.push(value);
            dataset.labels.push(value.date);
            dataset.datasets[0].data.push({x:value.date,y:value.oxygenValue});
        });
        myChart.update();

        }
    },`lastid=${lastid}`)},1000)

}


