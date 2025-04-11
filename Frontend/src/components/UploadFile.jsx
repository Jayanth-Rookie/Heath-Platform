import React,{useState} from 'react'
import axios from 'axios'

const UploadFile = ({account,contract}) => {
   
    const [file,setFile]=useState(null);
    const [filename,setFilename]=useState(null);
  const retrieveFile=(event)=>{
    event.preventDefault();
    const data=event.target.files[0];
    console.log(data);
    const reader=new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend=()=>{
        setFile(event.target.files[0]);
    }
    setFilename(data.name);
    console.log('File : ',data.name);
  }

  const handlesubmit=async(e)=>{
    e.preventDefault();
    if(file){
        try {
            const formData=new FormData();
            formData.append('file',file);
            console.log('Hi before pinata');
            
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                  pinata_api_key: `a12ed3ddbdfa09620b99`,
                  pinata_secret_api_key: `858c0829887c30bfa7e6978308885432a68ddbbdf5f29961e8544340d631730e`,
                  "Content-Type": "multipart/form-data",
                },
              });
              console.log('Hi');
            const ImgHash=`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            console.log(ImgHash);
            contract.add(account,ImgHash);
            alert('Successfully File Uploaded');
            setFilename('No file selected');
            setFile(null);
        } catch (error) {
            console.log(error);
        }
    }
    else{
        console.log('No file');
        
    }
  }


  return (
    <div className='top flex'>
      <form className='form' onSubmit={handlesubmit}>
        <label htmlFor='file-upload' className='choose'>
            choose Image
        </label>
        <input className='text-amber-50 rounded-2xl bg-black' placeholder='choose file' type='file' id='file-upload' name='data' disabled={!account} onChange={retrieveFile}  />
        <span className='textArea'>Image : {filename}</span>
        <button type='submit' className='upload text-amber-50 bg-amber-300' disabled={!file}>Upload File</button>
      </form>
    </div>
  )
}

export default UploadFile
