import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

export default function Register() {
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPhotoUrl, setSignupPhotoUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const nextPath = location.state?.from?.pathname || "/";

  const { googleSignIn, createAccount } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignupPasswordChange = (e) => {
    const value = e.target.value;
    setSignupPassword(value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(value)) {
      setSignupPasswordError(
        "Password must be at least 6 characters long and include both lowercase and uppercase letters."
      );
    } else {
      setSignupPasswordError("");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const password = e.target.password.value;

    try {
      await createAccount(email, password, name, photoUrl);
      Swal.fire("Success", "Account created successfully!", "success");
      navigate(nextPath);
    } catch (error) {
      console.error("Signup error: ", error);
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(nextPath);
      navigate(nextPath);
      Swal.fire("Success!", "Signed in with Google", "success");
    } catch (error) {
      console.error("Google Signin error: ", error);
      Swal.fire("Error!", error.message || "Google sign-in failed.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-[#FEEBCB] to-[#DCEEFF]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6  my-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-500">
          Create an Account
        </h2>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <label className="label-text font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your full name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label-text font-medium">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              className="input input-bordered w-full"
              placeholder="Profile image link"
              value={signupPhotoUrl}
              onChange={(e) => setSignupPhotoUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="label-text font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="label-text font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pr-10"
                placeholder="Enter your password"
                value={signupPassword}
                onChange={handleSignupPasswordChange}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {signupPasswordError && (
              <p className="text-red-500 text-xs mt-1">{signupPasswordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!!signupPasswordError}
            className="btn !bg-orange-500 !text-white w-full">
            Sign Up
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center gap-2">
            <FaGoogle /> Sign up with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
