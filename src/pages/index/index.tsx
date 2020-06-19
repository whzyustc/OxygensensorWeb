import React from 'react';
import ReactDOM from 'react-dom';

import {Hello} from "../../component/hello"

function getdata():any
{
    var xmlhttp:any;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();

    }
    xmlhttp.onreadyStatuechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            return xmlhttp.respnseText;
        }
    }
    xmlhttp.open("GET","last60",true);
    xmlhttp.send();
}

window.onload=function(){
    console.log(getdata());
}

ReactDOM.render(
    <Hello compiler='Typescript' framework="React" />,
    document.getElementById("example")
);

