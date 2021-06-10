import React from "react"
import {saveAs} from "file-saver"

export default function DownloadFileRow(props){

    
    function downloadFile(e){
        e.preventDefault();
        fetch(props.e.fileUrl,{
            method: 'GET',
        }).then(x=>{
            x.blob().then(x=>{
                saveAs(x, props.e.metadata.name)
            })
        })
        

    }

    return(
        <div className="file-row-section">
            
        {/* <button onClick={test}>Butt</button> */}
        <div className={`fiv-viv fiv-icon-${props.e.metadata.name.split('.')[1]}`}></div>
        <div className="">{props.e.metadata.name}</div>
            <div className="">{props.e.metadata.size} bytes</div>
            


            <svg title="download" onClick={downloadFile} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"><title>Download</title></path></svg>
        </div>
    )
}