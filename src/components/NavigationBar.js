import '../App.css';
import {useHistory} from 'react-router-dom'
import {React,  } from 'react'
import {  useAuth } from "../contexts/AuthContext"


function NavigationBar(props) {
  
  const history = useHistory()
  const {currentUser, logout}= useAuth()
  
  document.getElementById("App").classList.add("closeMargin")
  
  async function handleLogout() {

    try {
      await logout()
      history.push('/')

      
    } catch {
      console.log("error")
    }
  }

  function openNav(e) {
    e.preventDefault();
    document.getElementById("App").classList.add("openMargin");
    document.getElementById("mySidenav").classList.add("openNav");
    document.getElementById("App").classList.remove("closeMargin")
    document.getElementById("mySidenav").classList.remove("closeNav")
  }
function closeNav(e){
    e.preventDefault();
    document.getElementById("mySidenav").classList.add("closeNav");
    document.getElementById("App").classList.add("closeMargin");
    document.getElementById("App").classList.remove("openMargin")
    document.getElementById("mySidenav").classList.remove("openNav")
}
  

  return(
    <div id="mySidenav" className="sidenav closeNav">
      
      {/* <div className="logo">
          <svg width="47" height="60" viewBox="0 0 47 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.62933" y="5.62933" width="43" height="43" fill="#1F1F23" stroke="white" stroke-width="3"/>
          <path d="M32.03 26.996L33.509 27.257C33.5477 27.257 33.6057 27.2667 33.683 27.286C33.7797 27.286 33.8473 27.2473 33.886 27.17C34.0793 26.88 34.2243 26.532 34.321 26.126C35.0363 23.864 35.684 22.2787 36.264 21.37C36.8633 20.4613 37.6077 20.007 38.497 20.007C38.9417 20.007 39.3283 20.1327 39.657 20.384C39.9857 20.6353 40.15 20.9543 40.15 21.341C40.15 22.269 39.8503 22.733 39.251 22.733C39.0577 22.733 38.961 22.675 38.961 22.559C39.1157 22.2303 39.193 21.8147 39.193 21.312C39.193 20.79 39.048 20.529 38.758 20.529C38.1587 20.529 37.4433 21.3603 36.612 23.023C36.4767 23.2937 36.206 23.98 35.8 25.082C35.4133 26.1647 35.22 26.764 35.22 26.88C35.22 27.0733 35.3457 27.17 35.597 27.17L39.28 27.083C39.338 27.083 39.367 27.1217 39.367 27.199C36.7377 28.1077 35.1233 28.6297 34.524 28.765C34.524 28.9003 34.2147 29.8863 33.596 31.723C32.2427 36.305 30.8603 39.611 29.449 41.641C28.0377 43.671 26.462 44.686 24.722 44.686C23.8907 44.686 23.127 44.396 22.431 43.816C21.735 43.236 21.387 42.4433 21.387 41.438C21.387 41.322 21.4257 41.264 21.503 41.264C21.561 41.264 21.619 41.3703 21.677 41.583C22.1023 43.0523 23.0497 43.787 24.519 43.787C26.5877 43.787 28.6177 41.351 30.609 36.479C30.957 35.609 31.4017 34.362 31.943 32.738C32.5037 31.114 32.9483 29.8283 33.277 28.881C32.349 28.6297 31.885 28.0883 31.885 27.257C31.885 27.083 31.9333 26.996 32.03 26.996Z" fill="#7692FF"/>
          <path d="M11.8945 43H7.68359V11.5254H16.2773C17.9388 11.5254 19.4785 11.7402 20.8965 12.1699C22.3288 12.5853 23.5677 13.2012 24.6133 14.0176C25.6732 14.834 26.5039 15.8509 27.1055 17.0684C27.707 18.2715 28.0078 19.668 28.0078 21.2578C28.0078 22.3893 27.8574 23.4421 27.5566 24.416C27.2559 25.3757 26.8333 26.2493 26.2891 27.0371C25.7591 27.8249 25.1361 28.5267 24.4199 29.1426C23.7038 29.7441 22.9303 30.2526 22.0996 30.668C21.2689 31.0833 20.4023 31.3984 19.5 31.6133C18.5977 31.8281 17.6953 31.9355 16.793 31.9355C16.6211 31.9355 16.4349 31.9355 16.2344 31.9355C16.0339 31.9212 15.7904 31.8926 15.5039 31.8496L15.8047 28.627C16.0625 28.6699 16.2845 28.6986 16.4707 28.7129C16.6569 28.7129 16.8431 28.7129 17.0293 28.7129C17.946 28.7129 18.8053 28.5768 19.6074 28.3047C20.4238 28.0182 21.1328 27.5885 21.7344 27.0156C22.3503 26.4427 22.8301 25.7266 23.1738 24.8672C23.5319 23.9935 23.7109 22.9622 23.7109 21.7734C23.7109 20.556 23.5176 19.5104 23.1309 18.6367C22.7585 17.763 22.2142 17.0469 21.498 16.4883C20.7962 15.9297 19.9297 15.5215 18.8984 15.2637C17.8815 14.9915 16.7357 14.8555 15.4609 14.8555H11.8945V43Z" fill="#7692FF"/>
          </svg>
        </div> */}
      
      <div className="h-flex">
        <svg className="svg-home" viewBox="0 0 20 20" onClick={()=>{
            currentUser ? history.push("/home") : history.push("/")
          }}>
          <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
        </svg>
        <a href={currentUser ? "/home" : "/"}>Home</a>
      </div>
      {currentUser && (

        <>
      <div className="h-flex">
        <svg className="svg-files" viewBox="0 0 20 20" onClick={()=>{history.push("/files")}}>
                <path d="M17.927,5.828h-4.41l-1.929-1.961c-0.078-0.079-0.186-0.125-0.297-0.125H4.159c-0.229,0-0.417,0.188-0.417,0.417v1.669H2.073c-0.229,0-0.417,0.188-0.417,0.417v9.596c0,0.229,0.188,0.417,0.417,0.417h15.854c0.229,0,0.417-0.188,0.417-0.417V6.245C18.344,6.016,18.156,5.828,17.927,5.828 M4.577,4.577h6.539l1.231,1.251h-7.77V4.577z M17.51,15.424H2.491V6.663H17.51V15.424z"></path>
        </svg>
        <a href="/files">My Files</a>
      </div>
      
      </>
       )}
      
      
      {/* <div className="h-flex">
        <svg className="svg-about" viewBox="0 0 20 20" onClick={()=>{history.push("/about")}}>
                <path d="M8.627,7.885C8.499,8.388,7.873,8.101,8.13,8.177L4.12,7.143c-0.218-0.057-0.351-0.28-0.293-0.498c0.057-0.218,0.279-0.351,0.497-0.294l4.011,1.037C8.552,7.444,8.685,7.667,8.627,7.885 M8.334,10.123L4.323,9.086C4.105,9.031,3.883,9.162,3.826,9.38C3.769,9.598,3.901,9.82,4.12,9.877l4.01,1.037c-0.262-0.062,0.373,0.192,0.497-0.294C8.685,10.401,8.552,10.18,8.334,10.123 M7.131,12.507L4.323,11.78c-0.218-0.057-0.44,0.076-0.497,0.295c-0.057,0.218,0.075,0.439,0.293,0.495l2.809,0.726c-0.265-0.062,0.37,0.193,0.495-0.293C7.48,12.784,7.35,12.562,7.131,12.507M18.159,3.677v10.701c0,0.186-0.126,0.348-0.306,0.393l-7.755,1.948c-0.07,0.016-0.134,0.016-0.204,0l-7.748-1.948c-0.179-0.045-0.306-0.207-0.306-0.393V3.677c0-0.267,0.249-0.461,0.509-0.396l7.646,1.921l7.654-1.921C17.91,3.216,18.159,3.41,18.159,3.677 M9.589,5.939L2.656,4.203v9.857l6.933,1.737V5.939z M17.344,4.203l-6.939,1.736v9.859l6.939-1.737V4.203z M16.168,6.645c-0.058-0.218-0.279-0.351-0.498-0.294l-4.011,1.037c-0.218,0.057-0.351,0.28-0.293,0.498c0.128,0.503,0.755,0.216,0.498,0.292l4.009-1.034C16.092,7.085,16.225,6.863,16.168,6.645 M16.168,9.38c-0.058-0.218-0.279-0.349-0.498-0.294l-4.011,1.036c-0.218,0.057-0.351,0.279-0.293,0.498c0.124,0.486,0.759,0.232,0.498,0.294l4.009-1.037C16.092,9.82,16.225,9.598,16.168,9.38 M14.963,12.385c-0.055-0.219-0.276-0.35-0.495-0.294l-2.809,0.726c-0.218,0.056-0.351,0.279-0.293,0.496c0.127,0.506,0.755,0.218,0.498,0.293l2.807-0.723C14.89,12.825,15.021,12.603,14.963,12.385"></path>
          </svg>
        <a href="/about">About</a>
      </div> */}

      {currentUser &&(
        <div className="h-flex">
        <svg onClick={handleLogout} className="svg-logout" viewBox="-110 -90 550 550"><path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03	C192.485,366.299,187.095,360.91,180.455,360.91z"/>	<path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279	c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179	c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/></svg>
        <div id="logout" onClick={handleLogout}>Logout</div>
      </div>
        
      )}
      <div className="h-flex">
        <hr className="navbar-divider"/>
      </div>
      
      <div className="h-flex">
        <svg className="svg-toggle" viewBox="0 0 20 20" onClick={openNav}>
                <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
        </svg>
        <div id="close" onClick={closeNav}>Close</div>
      </div>
      
      

  
</div>

    
  );
  
};
export default NavigationBar