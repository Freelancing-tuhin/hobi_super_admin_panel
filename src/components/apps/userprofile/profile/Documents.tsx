import React, { useContext, useState } from 'react';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { uploadOrganizerDocuments } from 'src/service/uploadDocs';

const stepLabels = [
  'Licenses for Establishment',
  'Certificate of Incorporation',
  'Licenses for Activity Undertaken',
  'Certifications',
  'Insurance for Outdoor Activities',
  'Health & Safety Documents',
];

const fieldMapping: Record<string, string> = {
  'Licenses for Establishment': 'licenses_for_establishment',
  'Certificate of Incorporation': 'certificate_of_incorporation',
  'Licenses for Activity Undertaken': 'licenses_for_activity_undertaken',
  Certifications: 'certifications',
  'Insurance for Outdoor Activities': 'insurance_for_outdoor_activities',
  'Health & Safety Documents': 'health_safety_documents',
};

const DocumentUploadStepper = () => {
  const { login, user } = useContext<any>(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadCompleted, setUploadCompleted] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const backendField = fieldMapping[stepLabels[currentStep]]; // Get backend field name
      const newFiles = { ...files, [backendField]: file }; // Store using backend field name
      setFiles(newFiles);
    }
  };

  const nextStep = () => {
    if (currentStep < stepLabels.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleUpload(); // Upload on the last step
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleUpload = async () => {
    try {
      console.log('=====docs', files);
      const organizerId = user?._id; // Replace with actual ID
      const response = await uploadOrganizerDocuments(organizerId, files);
      console.log('Upload Success:', response);
      login(response?.result);
      setUploadCompleted(true);
    } catch (error) {
      console.error('Upload Failed', error);
    }
  };

  const backendField = fieldMapping[stepLabels[currentStep]]; // Get backend field name

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Step Heading */}
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
        {stepLabels[currentStep]}
      </h2>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer">
        {files[backendField] ? (
          <div className="relative">
            {/* Preview Image (if applicable) */}
            {files[backendField]?.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(files[backendField]!)}
                alt="Preview"
                className="w-full max-h-40 object-cover rounded-md"
              />
            )}
            {/* File Name */}
            <p className="text-gray-600 mt-2">{files[backendField]?.name}</p>
            {/* Replace Button */}
            <button
              onClick={() => setFiles({ ...files, [backendField]: null })}
              className="text-red-500 text-sm mt-2 underline"
            >
              Remove & Upload Another
            </button>
          </div>
        ) : (
          <label htmlFor="file-upload" className="block">
            <p className="text-gray-500 mt-2">Upload file</p>
            <p className="text-xs text-gray-400">PNG, JPG, SVG, WEBP, and GIF are allowed.</p>
          </label>
        )}

        {/* Hidden File Input */}
        <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
      </div>

      {/* Progress Bar */}
      {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
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
