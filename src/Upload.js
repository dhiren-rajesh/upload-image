import React, { useState, useRef } from "react";
import { FileDrop } from "react-file-drop";
import { drawRect } from "./Utilities";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "./Upload.css";

function Upload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzedFile, setAnalyzedFile] = useState(null);
  const [showBtn, setShowBtn] = useState(true);
  const [{ src, alt }, setFile] = useState({
    src: null,
    alt: "Upload an Image",
  });
  const canvasRef = useRef(null);

  const runCoco = async () => {
  const net = await cocossd.load();
  console.log("Handpose model loaded.");
  detect(net);
  };

  const detect = async (net) => {
    const img = document.getElementById("testimage");
    const width = 600;
    const height = 300;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    const obj = await net.detect(img);
    //value of ctx and bounding box
    console.log("ctx => ", ctx);
    console.log("obj => ", obj);
    drawRect(obj, ctx);
  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setFile({
      src: URL.createObjectURL(e.target.files[0]),
      alt: e.target.files[0].name,
    });
  };

  const onFileUpload = () => {
    if (selectedFile != null) {
      setSelectedFile(["myFile", selectedFile, selectedFile.name]);
    } else {
      alert("Please choose a file");
    }
  };

  const fileData = () => {
    if (selectedFile != null) {
          return (
            <div>
              <div className="box-preview">
                <img id="testimage" src={src} alt={alt}></img>
              </div>
              <h4 className="uploadTxt">File Uploaded.</h4>
            </div>
          );
        }
     else {
      return (
        <div>
          <div className="box-preview">
            <h4 className="choose">Choose before Pressing the Upload button</h4>
          </div>
        </div>
      );
    }
  };

  const analyzedData = () => {
    if(analyzedFile === "Analyzed"){
      return(
      <div>
      <div>
      <canvas
        className = "finalCanvas"
        ref={canvasRef}
      />
      </div>
      <div className="uploading-final">
        <label className="btn-fnc" htmlFor="reupload-btn">
          Upload Another File
        </label>
        <input
          type="button"
          style={{ display: "none"}}
          id="reupload-btn"
          onClick={() => {
            window.location.reload();
            }
          }
          />
          </div>
          </div>
      );
    }
  }

  const hideBtn = () =>{
    if(showBtn){
      return(
        <div className="uploading">
        <input
          type="file"
          accept="image/jpeg"
          style={{ display: "none" }}
          id="actual-btn"
          onChange={onFileChange}
        />
        <label className="btn-fnc" htmlFor="actual-btn">
          Choose File
        </label>
        <input
          type="button"
          style={{ display: "none" }}
          id="upload-btn"
          onClick = {onFileUpload}
        />
        <label className="btn-fnc" htmlFor="analyze-btn">
          Analyze
        </label>
        <input
          type="button"
          style={{ display: "none"}}
          id="analyze-btn"
          onClick={() => {
            if(selectedFile != null){
            console.log("start");
            runCoco();
            setAnalyzedFile("Analyzed"); 
            setShowBtn(false);
            }
            else{
              alert("Please Choose a File First")
            }
          }}
        />
      </div>
      );
    }
  }

  return (
    <div className="upload-component">
      <h1 className="uploadTxt">Please Upload a File</h1>
      {hideBtn()}
      <FileDrop
        onDrop={(file, e) => {
          console.log(file[0]);
          setSelectedFile(file[0]);
          setFile({
            src: URL.createObjectURL(file[0]),
            alt: file[0].name,
          });
          if (selectedFile != null) {
            setSelectedFile(["myFile", selectedFile, selectedFile.name]);
          }
        }}
      >
        {fileData()}
      </FileDrop>
      {analyzedData()}
    </div>
  );
}

export default Upload;

