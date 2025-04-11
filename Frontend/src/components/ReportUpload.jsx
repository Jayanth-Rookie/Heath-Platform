import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
const ReportUpload = ({account,contract}) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('No file selected');
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
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
  };

  const handleUpload =async (e) => {

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

    setUploadStatus('uploading');

    // Simulate upload and analysis process
    // setTimeout(() => {
    //   setUploadStatus('success');

    //   if (file.name.toLowerCase().includes('blood')) {
    //     setAnalysis("Your blood test results are within normal ranges. Iron levels are slightly low at 45 μg/dL (normal range: 50-170 μg/dL). Consider adding iron-rich foods like spinach and red meat to your diet, or consult with a doctor about iron supplements.");
    //   } else if (file.name.toLowerCase().includes('x-ray') || file.name.toLowerCase().includes('xray')) {
    //     setAnalysis("Your chest X-ray appears normal. No significant abnormalities detected in lung fields or cardiac silhouette. Heart size appears normal. No signs of pneumonia or other acute processes.");
    //   } else {
    //     setAnalysis("Your medical report has been analyzed. All results appear to be within normal ranges. Continue with your current health practices and follow up with your doctor as recommended.");
    //   }
    // }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setAnalysis(null);
    setUploadStatus('idle');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Medical Report</h2>
      <p className="text-gray-600 mb-6">
        Upload your medical reports to get a simplified explanation and store them securely.
      </p>

      {!file ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-medguard-300 transition-colors cursor-pointer"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
          <Upload size={40} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium">Drag & drop your file here</p>
          <p className="text-gray-500">or click to browse</p>
          <p className="text-sm text-gray-400 mt-2">Supports PDF, JPG, JPEG, PNG</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 flex items-start justify-between">
            <div className="flex items-center">
              <div className="bg-medguard-100 rounded-lg p-3 mr-4">
                <File size={24} className="text-medguard-500" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button onClick={clearFile} className="text-gray-400 hover:text-gray-500">
              <X size={20} />
            </button>
          </div>

          {uploadStatus === 'idle' && (
            <Button 
              onClick={handleUpload} 
              className="w-full bg-medguard-500 hover:bg-medguard-600"
            >
              Upload and Analyze Report
            </Button>
          )}

          {uploadStatus === 'uploading' && (
            <Button disabled className="w-full">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
              Processing...
            </Button>
          )}

          {uploadStatus === 'success' && analysis && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Report Analysis</h3>
              <div className="bg-medguard-50 border border-medguard-100 rounded-lg p-4">
                <p className="text-gray-800">{analysis}</p>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                This is a simplified explanation. Always consult with a healthcare professional for a complete interpretation.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportUpload;
