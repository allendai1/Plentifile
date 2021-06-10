import React, {useEffect, useRef,useState} from 'react'
import '../App.css';


export default function Footer(props) {
        return(
        <div className="footer">
            <div className="footer-table">
                <a href="/">Home</a>
                <a href="/upload">Upload </a>
                <a href="/contact">Contact</a>
                <a href="/login">Sign in / Sign up</a>
                
            </div>
            
            
        </div>
        
        )
        
}