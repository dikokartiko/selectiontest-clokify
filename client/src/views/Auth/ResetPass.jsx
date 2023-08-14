import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const params = useParams();
  const token = params.token;
  const resetPasswordSchema = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Kata sandi tidak boleh kosong!"),
      confirmPassword: Yup.string().required(
        "Konfirmasi kata sandi tidak boleh kosong!"
      ),
    }),
    onSubmit: async (values) => {
      await axios
        .patch(`http://localhost:8000/auth/reset-password/${token}`, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        .then((resp) => {
          toast.success("Reset password Succesfull successful!");
          nav("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Fail to change password please try again");
        });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mt-20 mb-8">
        <h1 className="text-4xl font-bold text-white">RESET PASSWORD</h1>
        <p className="text-md text-white font-normal mt-2 mb-6 w-3/4">
          Please fill your new password
        </p>
      </div>
      <div className="flex items-center justify-center mb-24 mt-5">
        <div className="flex flex-col w-96 p-10 bg-white rounded-lg shadow-lg">
          <form onSubmit={resetPasswordSchema.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                name="password"
                id="password"
                value={resetPasswordSchema.values.password}
                onChange={resetPasswordSchema.handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {resetPasswordSchema.errors.password &&
                resetPasswordSchema.touched.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {resetPasswordSchema.errors.password}
                  </p>
                )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={show ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={resetPasswordSchema.values.confirmPassword}
                onChange={resetPasswordSchema.handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {resetPasswordSchema.errors.confirmPassword &&
                resetPasswordSchema.touched.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {resetPasswordSchema.errors.confirmPassword}
                  </p>
                )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-bold rounded-md hover:bg-teal-200 active:bg-slate-950">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
