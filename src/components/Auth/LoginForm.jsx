import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

export default function LoginForm(loginForm) {
  const nextPath = loginForm.loginForm;
  const [login, setLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPhotoUrl, setSignupPhotoUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //collect from useContext
  const { googleSignIn, signInUser, createAccount, user } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 6 characters long and include both lowercase and uppercase letters."
      );
    } else {
      setPasswordError("");
    }
  };

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
    console.info("Signup button clicked");
    const email = e.target.email.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const password = e.target.password.value;

    try {
      const user = await createAccount(email, password, name, photoUrl);
      navigate(nextPath); // Navigate to home after successful signup
    } catch (error) {
      console.error("Signup error: ", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.info("Login button clicked");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      navigate(nextPath); // Navigate to home after successful login
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(nextPath);
      console.info("Google Signin success: ", user);
      if (user) {
        console.info("Google Signin success: user? ", user);
        navigate(nextPath); // Navigate to home after successful login
      }
    } catch (error) {
      console.error("Google Signin error: ", error);
    }
  };

  return (
    <div className="mx-auto">
      {!login && (
        <div className="signup-area flex items-center justify-center my-11">
          <div className="card bg-base-100 w-full px-4 py-10 max-w-sm shrink-0 shadow-2xl">
            <form className="card-body p-0" onSubmit={handleSignupSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="photo URL"
                  className="input input-bordered"
                  value={signupPhotoUrl}
                  onChange={(e) => setSignupPhotoUrl(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input input-bordered w-full pr-10"
                    value={signupPassword}
                    onChange={handleSignupPasswordChange}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {signupPasswordError && (
                  <p className="text-red-500 text-xs mt-1">
                    {signupPasswordError}
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!!signupPasswordError}>
                  Signup
                </button>
              </div>
              <p className="text-center">or</p>
            </form>
            <div className="form-control ">
              <button
                className="btn btn-secondary"
                onClick={handleGoogleSignIn}>
                Sign up with Google
              </button>
            </div>
            <p className="text-center py-2">
              Already Have Account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setLogin(true)}>
                Login
              </span>
            </p>
          </div>
        </div>
      )}
      {login && (
        <div className="login-area flex items-center justify-center py-10">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLoginSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input input-bordered w-full pr-10"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
                <label className="label">
                  <Link
                    to="/resetPassword"
                    className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!!passwordError}>
                  Login
                </button>
              </div>
              <p className="text-center">or</p>
              <div className="form-control ">
                <button
                  className="btn btn-secondary"
                  onClick={handleGoogleSignIn}>
                  Login with Google
                </button>
              </div>
              <p className="text-center py-2">
                Don't have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => setLogin(false)}>
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}