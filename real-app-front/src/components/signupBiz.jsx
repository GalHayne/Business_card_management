import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";

const SignUpBiz = ({ redirect = "/sign-in" }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, createUser } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(255).required().label("Name"),
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string().min(6).max(1024).required().label("Password"),
    }),
    async onSubmit(values) {
      try {
        const res = await createUser({ ...values, biz: true });
        if (res) {
          toast.success(`${res.data.name} you have successfully registered to the site, you are transferred to the login page`)
        }
        navigate(redirect);
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <div className="text-center">
      <PageHeader
        title="Sign Up as Business with Real App"
        description="Open a new business account, it is free for you!"
        />
    </div>

    <div className="center-div">
      <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          required
          error={form.touched.password && form.errors.password}
          />
        <Input
          {...form.getFieldProps("name")}
          type="text"
          label="Name"
          required
          error={form.touched.name && form.errors.name}
          />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
            >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignUpBiz;
