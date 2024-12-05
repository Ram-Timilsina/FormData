import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Practice() {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Username is required"; // Simple validation
        }
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Form Submitted:", values);
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Practice;
