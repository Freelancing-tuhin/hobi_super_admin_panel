import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { signupOrganizer } from 'src/service/createOrganization';

export const OrganizarModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({
    full_name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await signupOrganizer(formData);
      console.log('✅ Organizer created:', res);
      alert('Organizer created successfully!');
      setShowModal(false);
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
      });
    } catch (error) {
      console.error('❌ Error creating organizer:', error);
      alert('Failed to create organizer');
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2 flex items-center gap-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
      >
        <Icon icon="mdi:account-plus" height={20} />
        Create Organizer
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Add New Organizer
            </h2>

            <div className="grid gap-4">
              {[
                ['Full Name', 'full_name', 'mdi:account'],
                ['Phone', 'phone', 'mdi:phone'],
                ['Email', 'email', 'mdi:email'],
              ].map(([label, name, icon]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                  <div
                    className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full px-4 py-1"
                  >
                    <Icon icon={icon as string} className="text-gray-500 mr-2" />
                    <input
                      name={name as string}
                      type="text"
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      className="w-full outline-none border-none text-sm bg-gray-50 focus:ring-gray-50 focus:bg-gray-50 focus:border-none focus:outline-none "
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full px-4 py-1"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <div
                  className="flex flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                  focus:border-blue-500 block w-full px-4 py-1"
                >
                  <Icon icon="mdi:lock" className="text-gray-500 mr-2" />
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full outline-none border-none text-sm bg-gray-50 focus:ring-gray-50 focus:bg-gray-50 focus:border-none focus:outline-none "
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
