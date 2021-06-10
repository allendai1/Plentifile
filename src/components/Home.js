import React, { useEffect, useState} from 'react'
import {database,} from '../firebase'
import NavigationBar from "./NavigationBar"
import Upload from "./Upload"
import {  useAuth } from "../contexts/AuthContext"


export default function Home(){
    const {currentUser} = useAuth();
    const [loading,toggleLoading] = useState(true)
    const [fileSize,setFileSize] = useState(0)
    const [linksCreated,setLinksCreated] = useState(0)
    const [lastUploaded,setLastUploaded] = useState(0)
    const [totalViews,setTotalViews] = useState(0)

    
    

    useEffect(()=>{
        
        if(loading===true){
            loadFile();
        }

        database.users.doc(currentUser.uid).onSnapshot(doc=>{
            if(doc){
                setFileSize(doc.data().totalFileSize)
                setLinksCreated(doc.data().linksCreated)
                setLastUploaded(doc.data().lastUploaded)
            }
            
        })
        
    },[])
    
    const loadFile = async()=>{
        
        database.users.doc(currentUser.uid).collection("links").get().then(coll=>{
            setTotalViews(coll.docs.reduce((total,curr)=>{
                return total + curr.data().totalViews
            },0))
        })
        toggleLoading(false)
    }

    

    
    

    
    
        
        
        
        
        

        return(
            <>
            <NavigationBar/>
            <div className="home-page">
                <h1>{currentUser.email}</h1>
                <div className="nav-panel">
                    <div className="nav-panel-item">
                        <div className="nav-panel-item-header">Links Created</div>
                            <span>{linksCreated}</span>
                        </div>
                    <div className="nav-panel-item">
                        <div className="nav-panel-item-header">Storage</div>
                            <span>{(fileSize/1000000).toPrecision(3)}MB</span>
                        </div>
                    <div className="nav-panel-item">
                        <div className="nav-panel-item-header">Last uploaded</div>
                            <span>{lastUploaded}</span>
                        </div>
                    <div className="nav-panel-item">
                        <div className="nav-panel-item-header">Views</div>
                            <span>{totalViews}</span>
                        </div>
                </div>
                <div className="nav-panel-big-card">
                    <div className="nav-panel-upload-card" id="upload-card">
                        <div className="nav-panel-item-header">Upload</div>
                        <Upload/>
                    </div>
                    {/* <div className="nav-panel-item" id="recently-viewed-card">
                        <div  className="nav-panel-item-header">Recently viewed</div>
                    </div> */}
                </div>
                
            </div>

            
                


            
            
            </>
        
        )
   
    

}