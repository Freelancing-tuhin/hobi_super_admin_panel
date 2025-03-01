import { useContext, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { updateOrganizerProfile } from 'src/service/auth';

const FirmDetails = () => {
  const { user, login } = useContext<any>(AuthContext);
  const [serviceCategory, setServiceCategory] = useState('');
  const [typeOfFirm, setTypeOfFirm] = useState('');

  const handleUpdsate = () => {
    console.log('Updated Details:', { serviceCategory, typeOfFirm });
    // Add API call or state update logic here
  };

  const handleUpdate = async () => {
    try {
      const response = await updateOrganizerProfile(user?._id, { serviceCategory, typeOfFirm });
      login(response?.result);
      alert('Bank details updated successfully!');
    } catch (error) {
      console.error('Error updating bank details:', error);
      alert('Failed to update bank details.');
    }
  };

  return (
    <CardBox className="">
      <h2 className="card-title">Service Details</h2>
      <p className="card-subtitle mb-2">
        Update your service category and firm type to ensure accurate classification.
      </p>
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">Service Category</label>
        <select
          value={serviceCategory}
          onChange={(e) => setServiceCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category</option>
          <option value="IT Services">IT Services</option>
          <option value="Financial Services">Financial Services</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label className="block text-sm font-medium text-gray-700">Type of Firm</label>
        <select
          value={typeOfFirm}
          onChange={(e) => setTypeOfFirm(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select firm type</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
          <option value="Partnership">Partnership</option>
          <option value="Private Limited">Private Limited</option>
        </select>
      </div>
      <button
        onClick={handleUpdate}
        className="w-2/4 bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
      >
        Update
      </button>
    </CardBox>
  );
};

export default FirmDetails;
