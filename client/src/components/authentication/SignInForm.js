import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const SignInForm = (props) => {
  const { state } = props.location
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    validateInput(userPayload)
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/user-sessions", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        if(!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
        const userData = await response.json()
        setShouldRedirect(true)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  if (shouldRedirect) {
    if (state) {
      location.href = state.url
    } else {
      location.href = "/";
    }
  }

  return (
    <div className="h-full py-[11em] flex flex-col items-center" onSubmit={onSubmit}>
      <h1 className="text-4xl text-gray-700 font-serif font-bold my-2">Sign In</h1>
      <form className="w-full flex flex-col items-center space-y-3">
        <div className="w-full flex justify-center">
          <label htmlFor="email"/>
          <input 
            className="border border-gray-200 bg-white bg-opacity-50 backdrop-blur-md shadow-md rounded-lg min-w-[50%] px-3"
            type="text" 
            id="email"
            name="email" 
            value={userPayload.email} 
            placeholder="Email"
            onChange={onInputChange} />
          <FormError error={errors.email} />
        </div>
        <div className="w-full flex justify-center">
          <label htmlFor="password"/>
          <input
            className="border border-gray-200 bg-white bg-opacity-50 backdrop-blur-md shadow-md rounded-lg min-w-[50%] px-3"
            type="password"
            name="password"
            id="password"
            value={userPayload.password}
            placeholder="Password"
            onChange={onInputChange}
          />
          <FormError error={errors.password} />
        </div>
        <div>
          <input 
            className="mt-1 py-1 px-4 rounded-lg shadow-md text-white font-serif bg-[#ff485a]" 
            type="submit" 
            value="Sign In" 
            role="button"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;