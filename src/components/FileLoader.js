import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { useNavigate } from "react-router-dom";

//const FILELOADER_URL = '/loadFiles';


const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('image_url', value)
  } catch (e) {
    // saving error
    console.log(e)
    console.log("IMAGE_URL"+value)
  }
}


export default function ({ navigation }) {

    const CLOUD_NAME = 'dwx9rqfjh';
    const UPLOAD_PRESET = 'z87owhgv';
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const [file, setFile] = useState("");
    const [url, setUrl] = useState("");

    const [success, setSuccess] = useState(false);
    
    //const navigate = useNavigate();

    const upload = async () => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', UPLOAD_PRESET);
        data.append('cloud_name', CLOUD_NAME);

        fetch(cloudinaryUrl,
            {method: "POST",
                body: data})
            .then(resp => resp.json())
            .then(data => {setUrl(data.url);
            storeData(data.url.toString());
            })
            .then(setSuccess(true))
          
            //const data2 = await response.json()
            .catch(err => console.log(err))
       
    }

    return (
        <>
            {success ? (
                    <section style={{backgroundColor: 'grey'}}>
                        <h1>Foto cargada con Exito!</h1>
                        <img src={url} alt="Preview"/>
                        <button onClick={() => {
                            //navigation.goBack();
                            storeData(url.toString())}}> Volver </button>
                    </section>)

                : (<section className="custom" style={{backgroundColor: 'grey'}}>

                    <h1>
                        <span>Cargar foto</span>
                    </h1>

                    <div className="App">
                        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                        {file ? <img alt="Preview" height="140" src={URL.createObjectURL(file)}/> : null}
                        <button onClick={upload}>Upload</button>
                    </div>

                    <url/>

                    <image src={url}/>

                </section>)}
        </>
    );
};
