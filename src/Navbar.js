import React from 'react'
import './Navbar.css';
import './About.css';
import Upload from './Upload';

export default function Navbar() {
    return (
        <div>
        <navbar>
          <h1 className="brand">BRAND</h1>
            <h3 className="about">
              <a href="#about">About</a>
            </h3>
        </navbar>
        <Upload/>
        <div className="row" id="about">
            <div className="feature-box">
                <h3 className="feature-title">Easy to use</h3>
                <p  className="content">Just have to Upload or Drag and Drop an Image</p>
            </div>
            <div className="feature-box">
                <h3 className="feature-title">Quick and Responsive</h3>
                <p className="content">Results Displayed within Seconds</p>
            </div>
            <div className="feature-box">
                <h3 className="feature-title">Guaranteed to Work</h3>
                <p className="content">High Accuracy in getting Necessary Results</p>
            </div> 
        </div>
        </div>
    )
}
