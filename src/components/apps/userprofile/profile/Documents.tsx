import { useState } from 'react';
// import { AuthContext } from 'src/context/authContext/AuthContext';
import { uploadOrganizerDocuments } from 'src/service/uploadDocs';

const stepLabels = [
  'Licenses for Establishment',
  'Certificate of Incorporation',
  'Licenses for Activity Undertaken',
  'Certifications',
  'Insurance for Outdoor Activities',
  'Health & Safety Documents',
];

const fieldMapping: any = {
  'Licenses for Establishment': 'licenses_for_establishment',
  'Certificate of Incorporation': 'certificate_of_incorporation',
  'Licenses for Activity Undertaken': 'licenses_for_activity_undertaken',
  Certifications: 'certifications',
  'Insurance for Outdoor Activities': 'insurance_for_outdoor_activities',
  'Health & Safety Documents': 'health_safety_documents',
};

const DocumentUploadStepper = ({ user }: any) => {
  // const { login, user } = useContext<any>(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<any>({});
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const backendField = fieldMapping[stepLabels[currentStep]];
  const existingFileUrl = user?.[backendField] || null;

  const handleFileChange = (event: any) => {
    if (event.target.files?.length > 0) {
      const file = event.target.files[0];
      setFiles({ ...files, [backendField]: file });
    }
  };

  //   const removeFile = () => {
  //     setFiles((prevFiles:any) => {
  //       const updatedFiles = { ...prevFiles };
  //       delete updatedFiles[backendField];
  //       return updatedFiles;
  //     });
  //     document.getElementById('file-upload').value = '';
  //   };

  const nextStep = () => {
    if (currentStep < stepLabels.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleUpload();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleUpload = async () => {
    try {
      const organizerId = user?._id;
      await uploadOrganizerDocuments(organizerId, files);
      // login(response?.result);
      setUploadCompleted(true);
    } catch (error) {
      console.error('Upload Failed', error);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Your Documents</h2>
      <h2 className="text-sm font-semibold text-gray-700 text-left mb-4 pl-2">
        {stepLabels[currentStep]}
      </h2>

      <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer">
        <>
          <label htmlFor="file-upload" className="block">
            <p className="text-gray-500 mt-2">Upload file</p>
            <p className="text-xs text-gray-400 mb-4">PNG, JPG, SVG, WEBP, and GIF are allowed.</p>
          </label>
          <div className="relative">
            {files[backendField] ? (
              <img
                src={URL.createObjectURL(files[backendField])}
                alt="Preview"
                className="w-full max-h-40 object-cover rounded-md"
              />
            ) : (
              <img
                src={existingFileUrl}
                alt="Uploaded Document"
                className="w-full max-h-40 object-cover rounded-md"
              />
            )}
            <p className="text-gray-600 mt-2">{files[backendField]?.name || 'Existing File'}</p>
          </div>
        </>

        <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 text-black rounded-md disabled:opacity-50"
        >
          Back
        </button>
        <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          {currentStep === stepLabels.length - 1 ? 'Upload' : 'Next'}
        </button>
      </div>

      {uploadCompleted && <p className="text-green-500 mt-4">Upload completed successfully!</p>}
    </div>
  );
};

export default DocumentUploadStepper;
