import React, { useState } from "react";
import FormError from "../errors/FormError";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    firstName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { firstName, email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};

    if (firstName.trim() == "") {
      newErrors = {
        ...newErrors,
        firstName: "is required",
      };
    }

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="h-full py-[11em] flex flex-col items-center">
      <h1 className="text-4xl text-gray-700 font-serif font-bold my-2">Register</h1>
      <form 
      className="w-full flex flex-col items-center space-y-3"
      onSubmit={onSubmit}>
        <div className="w-full flex justify-center">
          <label htmlFor="firstName"/>
          <input
            className="border border-gray-200 bg-white bg-opacity-50 backdrop-blur-md shadow-md rounded-lg min-w-[50%] px-3"
            type="firstName"
            name="firstName"
            id="firstName"
            value={userPayload.firstName}
            placeholder="First Name"
            onChange={onInputChange} />
          <FormError error={errors.firstName} />
        </div>
        <div className="w-full flex justify-center">
          <label htmlFor="email"/>
          <input 
            className="border border-gray-200 bg-white bg-opacity-50 backdrop-blur-md shadow-md rounded-lg min-w-[50%] px-3" 
            type="text" 
            name="email" 
            id="email"
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
        <div className="w-full flex justify-center">
          <label htmlFor="passwordConfirmation"/>
          <input
            className="border border-gray-200 bg-white bg-opacity-50 backdrop-blur-md shadow-md rounded-lg min-w-[50%] px-3"
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={userPayload.passwordConfirmation}
            placeholder="Confirm Password"
            onChange={onInputChange}
          />
          <FormError error={errors.passwordConfirmation} />
        </div>
        <div>
          <input 
            className="mt-1 py-1 px-4 rounded-lg shadow-md text-white font-serif bg-[#ff485a]" 
            type="submit" 
            value="Register" 
            role="button" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
