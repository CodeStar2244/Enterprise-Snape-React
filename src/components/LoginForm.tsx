import { FunctionComponent, useCallback } from "react";
import { Container, Form, Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useState, useEffect } from 'react';
import { Formik } from "formik";
import { loginValidations } from "../Utils/validations";
import AuthService from "../api/auth/auth";
import { STATUS_CODE, VALIDATIONS, AUTH_TOKEN, FIRST_NAME, LAST_NAME } from "../Utils/constants";
import Loader from "./Loader/Loader";
import { getUserPassword, NotificationWithIcon } from "../Utils/helper";


const LoginForm: FunctionComponent = () => {
  const initialValue = getUserPassword()

  let formInitialValues = {
    email: initialValue?.email as string,
    password: initialValue?.password as string,
  }
  const navigate = useNavigate();

  const [loader, setLoader] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (values: any) => {
    if (checked) {
      localStorage.setItem("email", String(values.email));
      localStorage.setItem("password", String(values.password));
    }
    setLoader(true);
    try {
      const loginRes = await AuthService.postLoginDetail(values)
      if (loginRes && loginRes?.code === STATUS_CODE.SUCCESS) {
        setLoader(false);
        localStorage.setItem(AUTH_TOKEN, loginRes?.result?.token);
        localStorage.setItem(FIRST_NAME, loginRes?.result?.user?.firstName);
        localStorage.setItem(LAST_NAME, loginRes?.result?.user?.lastName);
        navigate('/gallery');
        NotificationWithIcon("success", "Login successful")
      }
    } catch (err: any) {
      setLoader(false);
      NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
    }
  }

  return (
    <>
      {loader && <Loader />}
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidations}>
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form className={styles.artboard134x81Parent} onSubmit={handleSubmit}>
            <Image
              className={styles.artboard134x81}
              alt=""
              src="../artboard-134x8-1@2x.png"
            />
            <h3 className={styles.studioManagementSuite}>
              Studio Management Suite Login
            </h3>
            <Form.Group className={styles.client} controlId="validationFormik01">
              <Form.Label className={styles.emailAddress}>Email Address</Form.Label>
              <Form.Control
                className={styles.form}
                name="email"
                type="text"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.email}</p>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.client} controlId="validationFormik02">
              <Form.Label className={styles.emailAddress}>Password</Form.Label>
              <Form.Control
                className={styles.form}
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.password}</p>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Check
              className={styles.rememberMe}
              type={"checkbox"}
              id={`default-${"checkbox"}`}
              checked={checked}
              label={`Remember me`}
              onChange={() => { setChecked(!checked) }}
            />
            <Form.Label className={styles.lostPassword}>Lost Password</Form.Label>
            <button className={styles.buttonChild} type="submit">Login</button>
            <div
              className={styles.onyRegisteredPhotographers}
            >{`Ony Registered Photographers & Videographers Can Login`}</div>
            <a className={styles.downloadAppTo} target="_blank">
              Download App To Register
            </a>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
