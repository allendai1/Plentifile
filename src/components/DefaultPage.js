import React, {useCallback, useEffect,useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {database,storage,} from '../firebase'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import sha256 from 'crypto-js/sha256'
import NavigationBar from "./NavigationBar"
import {useAuth } from "../contexts/AuthContext"
import firebase from "firebase/app"
import DownloadFileRow from "./DownloadFileRow"
import {downloadZip} from 'client-zip'
export default function DefaultPage(){
    const token = window.location.pathname.substring(1)
    
    let [pwprotected,setpwProtected] = useState()
    let passwordRef = useRef()
    const {currentUser} = useAuth()
    let history = useHistory()
    const [actualpassword,setpw] = useState()
    const [fileList, setFileList] = useState([])
    const [sorted,setSorted] = useState(true)
    const [loading,setLoading] = useState(true)
    const [metadata,setMetadata] = useState()
    const [alertState,setAlertState] = useState("")

    const loadFile = useCallback(async()=>{
        await database.links.doc(token).get().then(async(doc)=>{
            if(doc.exists){
                setpwProtected(doc.data().passwordProtected)
                setpw(doc.data().password)
                setMetadata(doc)
                if(currentUser){
                    await database.users.doc(currentUser.uid).collection('links').doc(token).update({
                        totalViews: firebase.firestore.FieldValue.increment(1),
                    })
                }
                
                


                
            }
            else{
                history.push("/")
            }
            
        })
        await storage.ref().child(window.location.pathname + "/").list().then(x=>{
            x.items.forEach(async (file,index)=>{
                const fileObj = {
                    fileUrl : await file.getDownloadURL().then((url)=>{
                        return url;
                    }),
                    metadata : await file.getMetadata().then((x)=>{
                        return x;
                    }),
                    name : index
                }
                
                setFileList(oldList=>[...oldList,fileObj].sort((a, b) => (a.name > b.name) ? 1 : -1))
            })
        })
        setLoading(false)
    },[currentUser,history,token])

    useEffect(()=>{
        if(loading===true){
            loadFile();
        }
        
    },[loadFile,loading])
    

    async function downloadAll(e){
        
        e.preventDefault();
        const res = fileList.map(async file=>{
            return await fetch(file.fileUrl,{
                method: 'GET',
            })
            .then(x=>x)
        })
        const blob = await downloadZip(res).blob()

        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = metadata.data().linkName
        link.click()
        link.remove()
    }


    
    

    function submit(e){
        e.preventDefault()
        let password = sha256(passwordRef.current.value).toString()
        console.log("Button submit")
        if(actualpassword===password){
            setpwProtected(false)
        } 
        else{
            setAlertState("Wrong password")
        }
    
        
    }

        function butt(){
            setSorted(!sorted)
            if(sorted){
                setFileList(old=>old.sort((a, b) => (a.name > b.name) ? -1 : 1))
            } else{
                setFileList(old=>old.sort((a, b) => (a.name > b.name) ? 1 : -1))
            }
            
        }
        
        
        return(
            <>
            <NavigationBar/>
            {pwprotected===true && (
            <div className="password_form">
                
                <Card>
                <Card.Header>Link is password protected</Card.Header>
                <Card.Body>
                <Form>
                    {alertState && <Alert variant="danger">{alertState}</Alert>}
                                <Form.Control ref={passwordRef} type="password" placeholder="Password"/>
                                </Form>
                                <br/>
                    <Button className="w-100" onClick={submit} variant="primary">Enter</Button>
                </Card.Body>
                </Card>
                
            </div>
            )}
            {pwprotected===false&&!loading && (
                <div className="files-page">
               
                <h1>{metadata.data().linkName} <Button onClick={downloadAll} title="Download all files as zip">Download files</Button></h1>
                <div className='files-container'>
                    <div className="files-container-header">My files </div>
                    {
                        fileList.map((e,index)=>{
                            return (
                                <DownloadFileRow key={index} e={e} />
                                
    
                            )
                        })
                    }
                    
                    
    
                    
                    
                    
                    
                    
    
                </div>
                
    
                </div>
                
            )}
            

         




            
            </>
        
        )
   
    

}