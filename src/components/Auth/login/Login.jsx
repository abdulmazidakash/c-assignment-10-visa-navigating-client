import { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const location = useLocation();
  const nextPath = location.state?.from?.pathname || '/';

  const { googleSignIn, signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        'Password must be at least 6 characters with lowercase & uppercase.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      await signInUser(email, password);
      Swal.fire('Success', 'Logged in successfully!', 'success');
      navigate(nextPath);
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire('Error', 'Login failed. Please check credentials.', 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await googleSignIn();

      if(!user){
        throw new Error('Google Sign-In failed. Please try again.');
      }
      Swal.fire(
        'Google Login Successful!',  
        `Welcome, ${user.displayName || "User"}`, 
        'success'
      );
      navigate(nextPath);
    } catch (error) {
      console.error('Google Signin error: ', error);
      Swal.fire(
        'Error!',
        error.message || 'Google Sign-In failed.',
        'error'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DAE2F8] to-[#D6A4A4] px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <label className="label-text font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label-text font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full pl-24 pr-20"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                className="absolute right-3 top-3 text-gray-500 text-lg sm:text-xl cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link
              to="/resetPassword"
              className="text-orange-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!!passwordError}
            className="btn !bg-orange-500 !text-white w-full"
          >
            Login
          </button>

          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex justify-center items-center gap-2"
          >
            <FaGoogle className="text-lg sm:text-xl" />
            Login with Google
          </button>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
