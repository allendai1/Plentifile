import React, { useCallback, useRef,useState} from 'react'
import '../App.css';
import firebase from "firebase/app"
import {Form} from 'react-bootstrap'
import {useAuth } from "../contexts/AuthContext"
import {database,storage} from '../firebase'
import {uid} from 'rand-token'
import sha256 from 'crypto-js/sha256'
import "aos/dist/aos.css";
import ScrollToTop from "./ScrollToTop"

import QRCode from "qrcode.react";


export default function Upload(){
        const storageRef = storage;
        const [passwordVisible, setPasswordVisible] = useState(false)
        const [fileList,setFileList] = useState([])
        const passwordRef = useRef("test")
        const linkNameRef = useRef(null)
        const {currentUser} = useAuth()
        const [submitted, setSubmitted] = useState(false)
        const [token,setToken] = useState(0)
        const [uploadedState, setUploadedState] = useState(1)
        const [inputkey, setInputKey] = useState(0)
        const descriptionRef = useRef();
        const [totalFileSize,setTotalFileSize] = useState(0)

        
        
        console.log("render")

    function resetFileList(){
            setInputKey(prev=>prev+1);
            setFileList([])
            setTotalFileSize(0)
    }
    async function validToken(){
        const token = uid(8)
        const valid  = await database.links.doc(token).get().then(doc=>doc)
                if(valid.exists){
                        return await validToken();
                }
                else{
                        setToken(token)
                        return token;
                }
        }

        const submit = useCallback(async e=>{
        e.preventDefault()
        const [name,desc,pass] = [linkNameRef.current.value,descriptionRef.current.value,passwordRef.current.value]
        setUploadedState(4)
        const t = await validToken();
        // console.log(name,desc,pass)
        
        
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
                        linkName: name ? name : t,
                        description : desc ? desc : "",
                        totalViews : 0,
                        size : totalFileSize,
                        numFiles : fileList.length,
                        fileTypes : fileList.map((e)=>e.type),
                        passwordProtected : pass ? true : false,
                        password : pass ? sha256(pass).toString() : 0,
                        })
                        database.users.doc(currentUser.uid).collection("links").doc(t).set({
                                date : newdate,
                                preciseDate : firebase.firestore.FieldValue.serverTimestamp(),
                                linkName: name ? name : t,
                                description : desc ? desc : "",
                                totalViews : 0,
                                size : totalFileSize,
                                numFiles : fileList.length,
                                fileTypes : fileList.map((e)=>e.type),
                                passwordProtected : pass ? true : false,
                                password : pass ? sha256(pass).toString() : 0,
                        }) 
                })      
        }));
        if(currentUser){
                

                await database.users.doc(currentUser.uid).update({
                        linksCreated : firebase.firestore.FieldValue.increment(1),
                        totalFileSize : firebase.firestore.FieldValue.increment(totalFileSize),
                        lastUploaded : t
                })
        }
        setSubmitted(true)
        setUploadedState(3) 

        },[fileList,totalFileSize])
//    
    

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

    }
    function uploadMore(e){
        e.preventDefault();
        setUploadedState(1);
        setFileList([])
        setTotalFileSize(0)

    }


   
    
    
   
    function deleteFile(x){
            setFileList(prev=>prev.filter((y)=>{
                    return x!==y
            }))
            setTotalFileSize(prev=>prev-x.size)
           

    }
   
   


    return(
        <>
        <ScrollToTop/>
                
        
        <div className="outer-card">
                {uploadedState===1 && (
                        <>
                                <div  className="files-list">
                                <div className="files-list-div">
                                {
                                        Array.from(fileList).map((x,index)=>{
                                                return (
                                                <div key={index}>
                                                        <svg onClick={()=>deleteFile(x)} xmlns='http://www.w3.org/2000/svg'  width="1.5rem" className='ionicon' viewBox='35 100 400 400'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 368L144 144M368 144L144 368'/></svg>

                                                        
                                                {x.name}
                                                </div>)
                                        })
                                }
                                </div>
                                </div>
                                
                                
                                <form className='uploadForm'>
                                        <input key={inputkey}type="file" name="file" id="file" className="inputfile" onChange={onFileChange} multiple/>
                                
                                        <label className='uploadButton'htmlFor="file">
                                                Select Files
                                        </label>
                                        
                                        
                                        
                                </form>
                                
                                
                                
                        
                        <button id="clear-button" onClick={resetFileList}>Clear</button>
                        
                        <div className="next-button" onClick={()=>{
                                if(fileList.length>0) {
                                        setUploadedState(2)
                                }
                        }}>Next</div>
                
                        </>

                )}
                
                
                {uploadedState===2 && (
                        <>
                                <form className="metadataForm">
                                        <div>
                                                <span>Name: </span><Form.Control type="text" placeholder="Optional" ref={linkNameRef}/>
                                        </div>
                                        <div>
                                                <span>Password:</span>
                                                <Form.Control type={!passwordVisible ? "password":"text"} placeholder="Optional" ref={passwordRef}/>
                                                
                                                <Form.Check type='checkbox' label="Show password" name="passwordCheckbox" onClick={()=>setPasswordVisible(prev=>!prev)}/>
                                                        
                                                
                                        </div>
                                        
                                        <div>
                                                <span>Description: </span>
                                                <Form.Control type="text" placeholder="Optional" ref={descriptionRef}/>
                                        </div>
                                </form>
                                <div className="submitform-button" onClick={submit}>Finish Upload</div>
                                <button className="back-button"onClick={()=>setUploadedState(1)}>Go back</button>
                                
                        </>
                        

                )}
                {uploadedState===3 && (
                        <div className="card-container">
                                
                        
                        <div className="inner-card-container share">
                                {submitted && (
                                        <div className="h-100">
                                        <a href={`/${token}`}>
                                                {`${window.location.host}/${token}`}
                                                
                                        </a>
                                        <QRCode value={`${window.location.host}/${token}`}/>
                                        </div>
        
                                )}
                                
                                
                                
                                
                                <button onClick={uploadMore}>Upload more</button>
                        </div>
                        
                </div>

                )}
                {uploadedState===4 && (
                       
                                
                        
                       <div className="load-container">
                       <div className="lds-facebook"><div></div><div></div><div></div></div>
               
                       </div>   
               
                                              
                                              
                                              
                                      
                                      
               
                              )}
        
        

        </div>
        
        </>
    )
}