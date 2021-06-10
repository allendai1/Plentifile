import React, { useState,useEffect,useRef } from "react"
import QRCode from "qrcode.react";
import {Modal,Button,Form} from 'react-bootstrap'
import {database,storage,firestore} from '../firebase'
import { useAuth } from "../contexts/AuthContext"
import sha256 from 'crypto-js/sha256'

function FilesRow(props){
  
  const p = useRef()
  
  const [pressed,setPressed] = useState(0)
  const [more,setMore] = useState(0)
  const [numFiles,setNumFiles] = useState(props.doc.data().numFiles)
  const [protectedState,setProtectedState] = useState(props.doc.data().passwordProtected);
  const passwordRef = useRef()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [show, setShow] = useState(false);
  const {currentUser} = useAuth()
  console.log("render")
  function handleClose(){
    setShow(false);
  }
  async function handlePassword(e){
    e.preventDefault();
    if(protectedState===true){
      await database.users.doc(currentUser.uid).collection("links").doc(props.doc.id).update({
        passwordProtected : false,
        password : 0,
      })
      await database.links.doc(props.doc.id).update({
        passwordProtected : false,
        password : 0,
      })
    } 
    else{
      const pw = sha256(passwordRef.current.value).toString()
      await database.users.doc(currentUser.uid).collection("links").doc(props.doc.id).update({
        passwordProtected : true,
        password : pw
      })
      await database.links.doc(props.doc.id).update({
        passwordProtected : true,
        password : pw
      })
    }
    setProtectedState(prev=>!prev)
    handleClose();
  }
  function handleShow(){
    
    
    

    setShow(true);
  }





  useEffect(()=>{
    setPressed(props.selectAllBool)
  },[props.selectAllBool])


  function togglePasswordProtection(e){
    e.preventDefault();
    if(protectedState){
      handleShow()
    } 
    else{
      handleShow()
    }
  }




  function togglePressed(doc){
    if(pressed===1){
      setPressed(0);
      props.select(prev=>prev.filter(entry=>entry!==doc.id))
      
    }
    else if(pressed===0){
      setPressed(1)
      props.select(prev=>[...prev, doc.id])
    }
    

      


   
    
  }
  function copyToClipboard(e){
    e.preventDefault();
    copyStringToClipboard(`${window.location.hostname}:3000/${props.doc.id}`)

  }
  function copyStringToClipboard(str){
    let el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 }

  function showMore(e){
    e.preventDefault();
    if(more===1){
      setMore(0)
    }
    else{
      setMore(1);
    }
  }


    return(
      <div>
        <>
      

      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Password</Modal.Title>
        </Modal.Header>
        {protectedState && (
          <Modal.Body>Remove your password</Modal.Body>
        )}
        {!protectedState && (
          <Modal.Body>
             <span>Password:</span>
              <Form.Control type={!passwordVisible ? "password":"text"} placeholder="Enter a password" ref={passwordRef}/>
              <Form.Check type='checkbox' label="Show password" name="passwordCheckbox" onClick={()=>setPasswordVisible(prev=>!prev)}/>
          </Modal.Body>
        )}
        
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {protectedState && (
            <Button variant="danger" onClick={handlePassword}>
            Remove password
            </Button>
          )}
          {!protectedState && (
            <Button variant="primary" onClick={handlePassword}>
            Set password
            </Button>
          )}
          
        </Modal.Footer>
      </Modal>
    </>



        <div className="files-inner-item files-inner-header">
              
              <div className="header-select"><div ref={p} pressed={pressed} onClick={()=>togglePressed(props.doc)} className="checkbox"></div></div>
              
              
              <div className="grid6"  onClick={showMore}>
              <div className="header-name">{props.doc.data().linkName==="" ? props.doc.id : props.doc.data().linkName}</div>
              <div className='header-desc'>{props.doc.data().description==="" ? "-": props.doc.data().description}</div>
              <div className="header-date">
                {props.doc.data().date}
              </div>
              <div className='header-size'>{props.doc.data().size/100000}MB</div>

              </div>
              
        </div>
        {more===1 && (
          <div className="more-div" more={more}>
            <div className="more-div-left">
              <div>
              <h2>Files</h2>
              {numFiles}
              </div>
              <div>
              <h2>Views</h2>
              {props.doc.data().totalViews}

              </div>
              <div>
                <h2>Password</h2>
                
                {protectedState && (
                  <svg className="svg-locked" onClick={togglePasswordProtection} viewBox="-2 -1 28 28"><path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z"/></svg>

                )}
                {protectedState===false && (
                  <svg className="svg-locked"  onClick={togglePasswordProtection} viewBox="-2 -1 28 28"><path d="M8 10v-4c0-2.206 1.795-4 4-4s4 1.794 4 4v1h2v-1c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-13zm11 12h-14v-10h14v10z"/></svg>  

                )}
              </div>
              <div>
              <h2>Copy</h2>
                <svg className="svg-copy" viewBox="0 0 20 20" onClick={copyToClipboard}>
                <path d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"></path>
                </svg>
              </div>
              <div className="more-div-right">
              <QRCode size={64} value={`${window.location.hostname}/${props.doc.id}`}/>
              <a href={`/${props.doc.id}` } target="_blank" rel="noopener noreferrer">{window.location.hostname}{`/${props.doc.id}`}</a>
            </div>
              
              
              </div>
            
            </div>
        )}
        
        </div>
    )
}
export default React.memo(FilesRow);