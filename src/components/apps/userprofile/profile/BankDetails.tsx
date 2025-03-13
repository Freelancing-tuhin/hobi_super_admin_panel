import { useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { updateOrganizerProfile } from 'src/service/auth';
// import { AuthContext } from 'src/context/authContext/AuthContext';

interface BankDetailsType {
  PAN: string;
  GST: string;
  bank_account: string;
  bank_account_type: string;
  IFSC_code: string;
}

const BankDetails = ({ user }: any) => {
  // const { user, login } = useContext<any>(AuthContext);

  const [step, setStep] = useState(1);
  const [bankDetails, setBankDetails] = useState<BankDetailsType>({
    PAN: user?.PAN || '',
    GST: user?.GST || '',
    bank_account: user?.bank_account || '',
    bank_account_type: user?.bank_account_type || '',
    IFSC_code: user?.IFSC_code || '',
  });

  const handleChange = (e: any) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await updateOrganizerProfile(user?._id, bankDetails);
      // login(response?.result);
      alert('Bank details updated successfully!');
    } catch (error) {
      console.error('Error updating bank details:', error);
      alert('Failed to update bank details.');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 ">
      <CardBox className="w-full max-w-4xl">
        <div className="p-">
          <h2 className="card-title">Bank Details</h2>
          <p className="card-subtitle">
            Securely update your bank details to ensure smooth transactions. Please provide accurate
            PAN, GST, and account information to avoid payment delays.
          </p>

          {/* Stepper */}
          <div className="flex w-full justify-start gap-5 my-4">
            <span
              className={`w-1/2 text-center py-2 w-32 rounded-2xl ${
                step === 1 ? 'text-white bg-blue-600 font-semibold' : 'text-gray-500 bg-gray-200 '
              }`}
            >
              Step 1
            </span>
            <span
              className={`w-1/2 text-center py-2 w-32 rounded-2xl ${
                step === 2 ? 'text-white bg-blue-600 font-semibold' : 'text-gray-500 bg-gray-200'
              }`}
            >
              Step 2
            </span>
          </div>

          {step === 1 && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-4 w-full md:w-1/2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAN</label>
                  <input
                    type="text"
                    name="PAN"
                    value={bankDetails.PAN}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">GST</label>
                  <input
                    type="text"
                    name="GST"
                    value={bankDetails.GST}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="https://img.freepik.com/free-vector/tax-concept-illustration_114360-5924.jpg?t=st=1740808259~exp=1740811859~hmac=c65f66fc9c4669b4277f60c51f190cb79cb4e618765c09918fefed7ff6148c5f&w=900"
                  alt="Banker illustration"
                  className="h-48 w-64 object-cover rounded-md"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-4 md:w-1/2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Account</label>
                  <input
                    type="text"
                    name="bank_account"
                    value={bankDetails.bank_account}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Type</label>
                  <select
                    name="bank_account_type"
                    value={bankDetails.bank_account_type}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Account Type</option>
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account</option>
                    <option value="student">Student Account</option>
                    <option value="salary">Salary Account</option>
                    <option value="business">Business Account</option>
                    <option value="joint">Joint Account</option>
                    <option value="fixed">Fixed Deposit Account</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                  <input
                    type="text"
                    name="IFSC_code"
                    value={bankDetails.IFSC_code}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-2/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="https://img.freepik.com/free-vector/online-banking-man-with-coins-using-laptop-cartoon-character-bank-account-income-savings-cashless-payment-freelancer-with-computer-making-money_335657-2315.jpg?t=st=1740808476~exp=1740812076~hmac=18f4dd6aaa0444f221e298ed811edf7c96651b0d751fd7de14ab1f6303fc97a1&w=900"
                  alt="Banker illustration"
                  className="h-48 w-64 object-cover rounded-md"
                />
              </div>
            </div>
          )}
        </div>
      </CardBox>
    </div>
  );
};

export default BankDetails;
