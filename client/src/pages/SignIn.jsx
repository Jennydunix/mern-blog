import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

export default function SignIn() {
  // create a state to handle the form data
  const [formData, setFormData] = useState({});
  // state for loading errors
  // const [errorMessage, setErrorMessage] = useState(null);
  // // state for loading errors
  // const [loading, setLoading] = useState(false);
   const {loading, error:errorMessage} = useSelector(state => state.user);
  // initialize useDispatch
  const dispatch = useDispatch();
  // to navigate the user to the next page after successful signIn
  const navigate = useNavigate();

  // track the changes function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // create an error if one of the forms is not filled up before submission
    if (!formData.email || !formData.password) {
      // return setErrorMessage("Please fill out all fields");
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      // // for loading effect
      // setLoading(true);
      // // if there's an error for the previous request
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // Error if username or email has already been used
      if (data.success === false) {
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
      // // if form is working correctly
      // setLoading(false);
      // condition to navigate user after successful signup
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
      // error message based on internet connection
    } catch (error) {
      // setErrorMessage(error.message);
      // // if there's an error
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side div */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-3xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              TechDunix
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Unlock a world of tech insights and updates tailored just for you.
            <br /> Sign in with your email and password or with Google.
          </p>
        </div>
        {/* right side div*/}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="******************"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Don&apos;t Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
