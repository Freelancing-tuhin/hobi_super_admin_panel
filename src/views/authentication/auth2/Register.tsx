import { useContext, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { Button, Label, TextInput } from 'flowbite-react';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { organizerSignup } from 'src/service/auth';
import { Link, useNavigate } from 'react-router';
import BoxedSocialButtons from '../authforms/BoxedSocialButtons';
import { AuthContext } from 'src/context/authContext/AuthContext';

const Register = () => {
  const { login }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    age: '',
    profile_pic: 'https://avatar.iran.liara.run/public/boy?username=Ash',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // Step tracking

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.email) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await organizerSignup(formData);
      setSuccess('Signup Successful!');
      login(response?.result);
      navigate('/apps/user-profile/profile');
    } catch (err: any) {
      setError(err?.message || 'Signup failed!');
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-100">
      <div className="flex h-full justify-center items-center px-4">
        <CardBox className="xl:max-w-5xl w-full border-none p-0 shadow-lg bg-white rounded-lg">
          <div className="grid grid-cols-12">
            {/* Left Section - Form */}
            <div className="xl:col-span-6 col-span-12 px-8 xl:border-e border-gray-300">
              <div className="py-14 lg:px-6">
                <FullLogo />
                <h3 className="text-3xl font-semibold my-5 text-gray-800">Create Your Account</h3>
                <BoxedSocialButtons title="Or sign up with email" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <form className="mt-6">
                  <div className="mb-4 w-full">
                    <Label htmlFor="email" value="Email Address" />
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      sizing="md"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={step === 1 ? handleNext : handleSignup}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                  >
                    {loading ? 'Processing...' : step === 1 ? 'Go Next' : 'Sign Up Account'}
                  </Button>
                </form>
                <div className="flex gap-2 text-sm font-medium mt-6 items-center text-gray-700">
                  <p>Already have an Account?</p>
                  <Link to="/auth/auth2/login" className="text-blue-600 font-semibold">
                    Sign in Now
                  </Link>
                </div>
              </div>
            </div>
            {/* Right Section - Image or Inputs */}
            <div className="xl:col-span-6 col-span-12 flex flex-col justify-center items-center p-8">
              {step === 1 ? (
                <img
                  src={
                    'https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1740770398~exp=1740773998~hmac=d1142efdf8858c87eb30efbd6711f0132f2083deefb6822cb78d4af75d624639&w=900'
                  }
                  alt="Signup Illustration"
                  className="w-full max-w-md"
                />
              ) : null}
              {step === 2 && (
                <>
                  <div className="mb-4 w-full">
                    <Label htmlFor="full_name" value="Full Name" />
                    <TextInput
                      id="full_name"
                      name="full_name"
                      type="text"
                      sizing="md"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <Label htmlFor="age" value="Age" />
                    <TextInput
                      id="age"
                      name="age"
                      type="number"
                      sizing="md"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <Label htmlFor="phone" value="Phone Number" />
                    <TextInput
                      id="phone"
                      name="phone"
                      type="text"
                      sizing="md"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <Label htmlFor="address" value="Address" />
                    <TextInput
                      id="address"
                      name="address"
                      type="text"
                      sizing="md"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <Label htmlFor="password" value="Password" />
                    <TextInput
                      id="password"
                      name="password"
                      type="password"
                      sizing="md"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default Register;
