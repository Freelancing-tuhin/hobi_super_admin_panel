import { useContext, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import BoxedAuthSlider from '../authforms/BoxedAuthSlider';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router';
import { loginOrganizer } from 'src/service/auth';
import { AuthContext } from 'src/context/authContext/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login }: any = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data: any = await loginOrganizer(email, password);
      console.log('Login successful:', data.result);

      // Save token in localStorage or context (if needed)
      localStorage.setItem('authToken', data.token);
      login(data.result);

      // Navigate to dashboard or home page
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-cover bg-center bg-[url('/src/assets/images/backgrounds/login-bg.jpg')]">
      <div className="flex h-full justify-center items-center px-4">
        <CardBox className="xl:max-w-6xl lg:max-w-3xl md:max-w-xl w-full border-none p-0">
          <div className="grid grid-cols-12">
            <div className="xl:col-span-6 col-span-12 px-8 xl:border-e border-ld">
              <div className="md:py-14 py-8 lg:px-6">
                <FullLogo />
                <h3 className="md:text-34 text-2xl md:my-8 my-5">Let's get you signed in</h3>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email Address" />
                    </div>
                    <TextInput
                      id="email"
                      type="text"
                      sizing="md"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="userpwd" value="Password" />
                      <Link className="text-xs text-primary" to={'/auth/auth2/forgot-password'}>
                        Forgot Password?
                      </Link>
                    </div>
                    <TextInput
                      id="userpwd"
                      type="password"
                      sizing="md"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between my-5">
                    <div className="flex items-center gap-2">
                      <Checkbox id="accept" className="checkbox" defaultChecked />
                      <Label htmlFor="accept" className="font-medium cursor-pointer">
                        Keep me logged in
                      </Label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="rounded-md w-full bg-sky dark:bg-sky hover:bg-dark dark:hover:bg-dark"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </form>
                <div className="flex gap-2 text-sm dark:text-white font-medium mt-6 items-center">
                  <p>Don’t have an account yet?</p>
                  <Link to={'/auth/auth2/register'} className="text-primary text-sm font-semibold">
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="xl:col-span-6 col-span-12 xl:block hidden">
              <BoxedAuthSlider />
            </div>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default Login;
