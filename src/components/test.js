// import React, {useEffect, useRef,useState} from 'react'
// import '../App.css';
// import firebase from "firebase/app"
// import {Form,Container,Card,Alert,Button,FormCheck} from 'react-bootstrap'
// import {useAuth } from "../contexts/AuthContext"
// import {BrowserRouter as Router,Switch,Route,Redirect,Link,useHistory} from 'react-router-dom'
// import {database,firestore,storage} from '../firebase'
// import {uid} from 'rand-token'
// import sha256 from 'crypto-js/sha256'
// import AOS from "aos";
// import "aos/dist/aos.css";
// import ScrollToTop from "./ScrollToTop"
// import selecticon from "../static/select.svg";
// import uploadicon from "../static/upload.svg";
// import shareicon from "../static/share.svg";
// import QRCode from "qrcode.react";
// import NavigationBar from "./NavigationBar";


// export default function Upload(){
//         const hostname = window.location.hostname
//         const storageRef = storage;
//         const [passwordVisible, setPasswordVisible] = useState(false)
//         let history = useHistory()
//         let [buttonState,setButtonState] = useState(false)
//         const [fileList,setFileList] = useState([])
//         const [linkNameBool, setLinkNameBool] = useState(false)
//         const passwordRef = useRef()
//         const linkNameRef = useRef(null)
//         const {currentUser,login} = useAuth()
//         const [pressed,setPressed] = useState(0)
//         const [submitted, setSubmitted] = useState(false)
//         const [token,setToken] = useState(0)
//         const [loading,setLoading] = useState(false)
//         const emailRef= useRef()
//         const [loginCard, setLoginCard] = useState(true) // true==login
//         const test = useRef()
//         const [uploadedState, setUploadedState] = useState(1)
//         const [inputkey, setInputKey] = useState(0)
//         const descriptionRef = useRef();
//         const [totalFileSize,setTotalFileSize] = useState(0)

//         useEffect(()=>{
//             AOS.init({
//                     // initialise with other settings
//                     duration : 750,
//                     once:true,
//                   });
//         },[])
    

//     function resetFileList(){
//             setInputKey(prev=>prev+1);
//             setFileList([])
//             setTotalFileSize(0)
//     }
//     async function submit(e){
//             e.preventDefault()
//             const t = uid(8)
//             setToken(t)
            
//             await Promise.all(Array.from(fileList).map(async (x) => {
//                     const fileRef = storageRef.ref(t).child(x.name)
//                     return await fileRef.put(x).then(async ()=>{
                        
//                         const dateObj = new Date();
//                         const month = dateObj.getUTCMonth() + 1;
//                         const day = dateObj.getUTCDate();
//                         const year = dateObj.getUTCFullYear();
//                         const newdate = month + "/" + day + "/" + year;

//                         database.links.doc(t).set({
//                                 passwordProtected : (passwordRef.current.value ? true: false),
//                                 password : (passwordRef.current.value ? true: false) ? sha256(passwordRef.current.value).toString() : 0,
//                                 date : newdate,
//                                 preciseDate : firebase.firestore.FieldValue.serverTimestamp(),
//                                 linkName: linkNameRef.current.value!==null ? linkNameRef.current.value : "Untitled",
//                                 description : descriptionRef.current.value,
//                                 totalViews : 0,
//                                 size : totalFileSize,
//                                 numFiles : fileList.length,
//                                 fileTypes : fileList.map((e)=>e.type)
//                         }) 
                        
                        
                        
//                 })      
//             }));
//             if(currentUser){
//                 database.users.doc(currentUser.uid).update({
//                         linksCreated : firebase.firestore.FieldValue.increment(1),
//                         totalFileSize : firebase.firestore.FieldValue.increment(totalFileSize),
//                         lastUploaded : t
//                 })
//             }
            
            
//             setPressed(1);
//             setSubmitted(true)
//             setUploadedState(false)
            
            

            
//     }
    

//     function onFileChange(e){
//             const files = e.target.files;
//             setTotalFileSize(Object.values(files).reduce( ( sum , cur ) => sum + cur.size , 0))
           
//             // Filter files so list contains unique file names only
//             setFileList(prev=>{
//                     const seen = new Set();
//                     const filteredArr = [...prev,...files].filter(el => {
//                             const duplicate = seen.has(el.name);
//                             seen.add(el.name);
//                             return !duplicate;
//                           });
//                     return filteredArr;
                    
//             })
//             setButtonState(true)
//             console.log(fileList)

//     }


   
    
    
//     function press(e){
//             e.preventDefault();
//             setPressed(1);
//             console.log(totalFileSize)
//     }
//     function deleteFile(x){
//             setFileList(prev=>prev.filter((y)=>{
//                     return x!==y
//             }))
//             setTotalFileSize(prev=>prev-x.size)
           

//     }
   


//     return(
//         <>
//         <ScrollToTop/>
//         {/* <NavigationBar/> */}
        
//         <div className="outer-card">
//                 {uploadedState===1 && (
//                         <>
//                                         <div  className="files-list">
//                                         <div>
//                                         {
//                                                 Array.from(fileList).map((x,index)=>{
//                                                         return (
//                                                         <div key={index}>
//                                                                                 <svg onClick={()=>deleteFile(x)} xmlns='http://www.w3.org/2000/svg' height="94%" width="1.5rem" className='ionicon' viewBox='35 100 400 400'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 368L144 144M368 144L144 368'/></svg>

//                                                                 {/* <span>
//                                                                         <button onClick={()=>deleteFile(x)}>Delete</button>
//                                                                 </span> */}
//                                                         {x.name}
//                                                         </div>)
//                                                 })
//                                         }
//                                         </div>
//                                         </div>
                                        
                                        
//                                         <form className='uploadForm'>
//                                                 <input key={inputkey}type="file" name="file" id="file" className="inputfile" onChange={onFileChange} multiple/>
                                        
//                                                 <label className='uploadButton'htmlFor="file">
//                                                         Select Files
//                                                 </label>
                                                
                                               
                                                
//                                         </form>
                                        
                                        
                                        
                                
//                                 <button id="clear-button" onClick={resetFileList}>Clear</button>
                                
//                                 <div className="next-button" onClick={()=>{
//                                         if(fileList.length>0) {
//                                                 setUploadedState(2)
//                                         }
//                                 }}>Next</div>
                
//                         </>

//                 )}
                
//                 {uploadedState===2 && (
//                         <>
                                

                                
//                                 {true && (
//                                         <form class="metadataForm">
//                                                 <div>
//                                                         <span>Name: </span><Form.Control type="text" placeholder="Optional" ref={linkNameRef}/>
//                                                 </div>
//                                                 <div>
//                                                         <span>Password:</span>
//                                                         <Form.Control type={!passwordVisible ? "password":"text"} placeholder="Optional" ref={passwordRef}/>
                                                        
//                                                         <Form.Check type='checkbox' label="Show password" name="passwordCheckbox" onClick={()=>setPasswordVisible(prev=>!prev)}/>
                                                                
                                                        
//                                                 </div>
                                                
//                                                 <div>
//                                                         <span>Description: </span>
//                                                         <Form.Control type="text" placeholder="Optional" ref={descriptionRef}/>
//                                                 </div>
                                                
                                                
                                                


//                                         </form>

//                                 )}
                
                                
//                                 <div className="submitform-button" onClick={submit}>Finish Upload</div>
//                                 <button className="back-button"onClick={()=>setUploadedState(1)}>Go back</button>
                                
//                         </>
                        

//                 )}
//                 {pressed===1 && (
//                         <div className="card-container">
                                
                        
//                         <div className="inner-card-container share">
//                                 {submitted && (
//                                         <>
//                                         <a href={`/${token}`}>
//                                                 {`${window.location.host}/${token}`}
                                                
//                                         </a>
//                                         <QRCode value={`${window.location.host}/${token}`}/>
//                                         </>
        
//                                 )}
                                
                                
                                
                                
                                
//                         </div>
//                 </div>

//                 )}
        
        

//         </div>
        

        
        
                
        
       
        
      
//         </>
//     )
// }