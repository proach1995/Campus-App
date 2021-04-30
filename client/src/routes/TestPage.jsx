import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';
import DataServer from '../api/DataServer';

const TestPage=()=>{

    //State als "golabe" variable
    const [idIndex, setIdIndex] = useState(1);//Wegen der Asynchronität wird es auf 1 gesetzt
    
    //Einzelnes Bild zum hochladen
    const [imageFile, setImageFile] = useState("");

    //Mehrere Bilder zum hochladen
    const [imageFiles, setImageFiles] = useState([]);

    //Dynamisches inputfeld
    const [inputFields, setInputFields] = useState([{
        id:0
    }]);


    //Submithandler um ein einzelnes Bild hochzuladen
    //IDEE: Das bild wird in FormData gespeichert und zu backend server gesenet und dort gespeichert
    const submitHanlderImage = async e =>{
        e.preventDefault();
        //console.log("Submit Handler");
        //console.log(imageFile);
        
        //Formdata erzeugen und bild speichern
        const formData = new FormData();
        formData.append("imageFile", imageFile);

        //Kontrolle mir unnötigerweise for-loop
        for(let obj of formData){
            console.log(obj);
        }

        //Senden zum Backend
        const headers = {
            'content-type': 'multipart/form-data'
        }
        const res = await DataServer.post("/uploadProfileImage", formData, {headers}//Header ist ein muss
        );
    }

    const SubmitHandlerImages = async(e)=>{
        e.preventDefault();

        const formData = new FormData();

        for(let i =0; i<imageFiles.length;i++){
            const result = await DataServer.get("product/"+1+"/"+imageFiles[i].name);
            console.log(result.data.exist);
            if(result.data.exist == false){
                formData.append("imageState", imageFiles[i]);
            }
        }
        
        //console.log(formData.imageState);undefined???
        
        //Kontrollausgabe
        for(let obj of formData){
            console.log(obj);
        }
        
        const headers = {
            'content-type': 'multipart/form-data'
        }
        const res = await DataServer.post("/uploadProducts", formData, {headers}//Header ist ein muss
        );
        
    }


    const inputFieldHandler = (e)=>{

        console.log("change");
        setIdIndex(idIndex+1);
        console.log(idIndex);//Asynchron der wert hat sich noch nicht geändert. Deswegen ist der index immer 1 vorraus
        setImageFiles([...imageFiles,e.target.files[0]]);
        setInputFields([...inputFields, {id:idIndex}]);

    }

    const abortButton = (e) =>{
        e.preventDefault();
        console.log("Button");

        //Features, dass der Abbruch button dan erscheint, wenn ein file selected ist
        //Das nicht alles gelöscht werden kann
        if(idIndex>1){
        setIdIndex(idIndex-1);
        //Element aus dem array löschen
        var list = [...inputFields];
        var listIndex = list.indexOf(e.target.value);

        console.log(listIndex);
        console.log(list);

        if(listIndex ===-1){
            list.splice(listIndex, 1);
        }
        setInputFields(list);
    }
    else{
        console.log("Kein Abbruch");
    }

    }

  
    
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1>
               Seite um Paar Funktionen  zu Testen
            </h1>

            <form>
                <label>Nur für 1 bild</label>
                <input 
                type="file"
                id="imageFile"
                accept="jpg"
                onChange={(e) =>{setImageFile(e.target.files[0])}}/>
                <button type="submit" onClick={submitHanlderImage}>Submit</button>
            </form>

            <p>-------------------------------Dynamisch--------------------------------------------</p>
            {inputFields.map(inputField =>(
                <form key={inputField.id}>
                    <label>Bild hochladen</label>
                    <input type="file" onChange={inputFieldHandler}/>
                    <button type="submit" onClick={(e)=>{abortButton(e)}}>Abbruch</button>
                </form>
            ))}
            <form>
                <button type="submit" onClick={(e)=>{SubmitHandlerImages(e)}}>Submit</button>
            </form>

            
        </div>
    )
}

export default TestPage;