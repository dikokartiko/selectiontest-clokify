import React from "react";
import { toast } from "react-toastify";
import { TEInput, TERipple } from "tw-elements-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function SignIn() {
  // Define a validation schema using Yup
  const nav = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      ),
  });

  // Define a submit handler function
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        values
      );
      localStorage.setItem("token", response.data.token);
      response?.data?.user?.roleId !== 1
        ? nav("/attandance-live")
        : nav("/admin-dasboard");
      toast.success("Login successful!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="h-screen">
      <div className="container p-10 h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <Field name="email">
                    {({ field, meta }) => (
                      <TEInput
                        {...field}
                        type="email"
                        label="Email address"
                        size="lg"
                        className="mb-6"
                        error={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <TEInput
                        {...field}
                        type="password"
                        label="Password"
                        className="mb-6"
                        size="lg"
                        error={meta.touched && meta.error}
                      />
                    )}
                  </Field>

                  <div className="mb-6 items-center justify-between">
                    <TERipple rippleColor="light">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        Login
                      </button>
                    </TERipple>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
