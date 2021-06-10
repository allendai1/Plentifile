import React, {useState} from 'react'
import '../App.css';
import firebase from "firebase/app"
import {Jumbotron,Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {database,storage} from '../firebase'
import {uid} from 'rand-token'

import ScrollToTop from "./ScrollToTop"

import QRCode from "qrcode.react";


export default function RestrictedUpload(){
        const storageRef = storage;
        let history = useHistory()
        let [buttonState,setButtonState] = useState(false)
        const [fileList,setFileList] = useState([])
        const [submitted, setSubmitted] = useState(false)
        const [token,setToken] = useState(0)
        const [loading,setLoading] = useState(false)
        const [uploadedState, setUploadedState] = useState(1)
        const [totalFileSize,setTotalFileSize] = useState(0)


    
    

    
    async function validToken(){
        const token = uid(8)
        const valid  = await database.links.doc(token).get().then(doc=>doc)
                if(valid.exists){
                        return await validToken();
                }
                else{
                        return token;
                }
        }



    async function submit(e){
        e.preventDefault()
        if(fileList.length>0){
            setLoading(true)
        setUploadedState(0)
        const t = await validToken();
        setToken(t)
        await Promise.all(Array.from(fileList).map(async(x) => {
                const fileRef = storageRef.ref(t).child(x.name)
                return await fileRef.put(x,{contentDisposition:"attachment"}).then(()=>{
                    const dateObj = new Date();
                    const month = dateObj.getUTCMonth() + 1;
                    const day = dateObj.getUTCDate();
                    const year = dateObj.getUTCFullYear();
                    const newdate = month + "/" + day + "/" + year;
                       

                    database.links.doc(t).set({
                        date : newdate,
                        preciseDate : firebase.firestore.FieldValue.serverTimestamp(),
                        linkName: t,
                        description : "",
                        totalViews : 0,
                        size : totalFileSize,
                        numFiles : fileList.length,
                        fileTypes : fileList.map((e)=>e.type),
                        passwordProtected : false,
                        password : 0,
                        })
                        
                })      
        }));
                
                setSubmitted(true)
                setUploadedState(3)     
                setFileList([])
                setLoading(false)

        }
        
    }
    

    function onFileChange(e){
            const files = e.target.files;
            setTotalFileSize(Object.values(files).reduce( ( sum , cur ) => sum + cur.size , 0))
            // Filter files so list contains unique file names only
            setFileList(prev=>{
                    const seen = new Set();
                    const filteredArr = [...prev,...files].filter(el => {
                            const duplicate = seen.has(el.name);
                            seen.add(el.name);
                            return !duplicate;
                          });
                    return filteredArr;
            })
            setButtonState(true)
    }
    function uploadMore(e){
        e.preventDefault();
        setUploadedState(1);
        setFileList([])
        setTotalFileSize(0)

    }


   
    
    
    
    
 


    return(
        <>
        <ScrollToTop/>
        <Jumbotron style={{padding: "3rem 2rem"}} >
            <h1>Want more features?</h1>
            <p>
                Sign up to access additional features, such as<br/>- Custom name and descriptions<br/>- Password protected links<br/>- Multiple file uploads
            </p>
            
            <p>
                <Button onClick={()=>history.push("/")} variant="primary">Sign up</Button>
            </p>
        </Jumbotron>
        <div className="restricted-upload-page">
            {uploadedState>0&&fileList.length>0&&fileList[0].name}
        {uploadedState===1 && (
                        <>
                        <form>
                                <input type="file" name="file" id="file" className="inputfile" onChange={onFileChange}/>
                        
                                
                                <label htmlFor="file" className="select-files">Select files</label>
                                
                                
                                
                                
                                
                        </form>
                        <Button variant="dark" onClick={submit} disabled={buttonState ? "" : true}>Upload</Button>      
                                        
                                        
                                
                                
                                
                
                        </>

                )}
                {loading && (
                    <div class="lds-ring"><div></div><div></div><div></div></div>
                )}
                {uploadedState===3 && (
                                
                        
                        <div className="restricted-share">
                                {submitted && (
                                        <>
                                        <QRCode value={`${window.location.host}/${token}`}/>
                                        <a href={`/${token}`}>
                                                {`${window.location.host}/${token}`}
                                                
                                        </a>
                                        
                                        </>
        
                                )}
                                
                                
                                
                                
                                <Button variant="dark" onClick={uploadMore}>Upload more</Button>
                        </div>
                        

                )}

        </div>
                
        
                
                
                
        
        

        
        </>
    )
}