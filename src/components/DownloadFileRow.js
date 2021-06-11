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
    function bytesToSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return String(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]);
    }

    return(
        <div className="file-row-section">
            
        {/* <button onClick={test}>Butt</button> */}
        <div className={`fiv-viv fiv-icon-${props.e.metadata.name.split('.')[1]}`}></div>
        <div className="">{props.e.metadata.name}</div>
            <div className="">{ bytesToSize(props.e.metadata.size)}</div>
            


            <svg title="download" onClick={downloadFile} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"><title>Download</title></path></svg>
        </div>
    )
}