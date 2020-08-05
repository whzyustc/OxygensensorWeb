import  Chart  from "chart.js";
interface IData{
    id:number;
    date:string;
    oxygenValue:number;
}
function getdata(router:string,callback:any):any
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
    xmlhttp.open("GET",router,true);
    xmlhttp.send();
}

window.onload=function(){
    var ans:IData[];
    var timer:any;
    var lastid:number;
    getdata("last60s",function(data:string){
        ans=JSON.parse(data);

        console.log(ans.constructor==Array);
            
        lastid=ans[ans.length-1].id;
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

    timer=setInterval(getdata("datafromid",function(data:string){

        let tmp:IData[]=JSON.parse(data);
        if (tmp.length>0)
        {
            
        lastid=tmp[tmp.length-1].id;
        console.log(lastid);
        tmp.map(value=>{
            ans.push(value);
            dataset.labels.push(value.date);
            dataset.datasets[0].data.push({x:value.date,y:value.oxygenValue});
        });
        myChart.update();

        }
    }),1000)
    });
    


}


