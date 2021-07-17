import React from 'react'
import './About.css';

export default function About() {
    return (
        <div className="row">
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
    )
}
