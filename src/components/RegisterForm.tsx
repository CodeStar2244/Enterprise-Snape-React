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


const RegisterForm: FunctionComponent = () => {

  let formInitialValues = {
    email: "" as string,
    name: "" as string,
    registrationNumber: "" as string,
    userName: "" as string,
    password: "" as string,
    confirmPassword: "" as string,
  }
  const navigate = useNavigate();

  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    setLoader(true);
    try {
      const loginRes = await AuthService.postRegisterDetail(values)
      if (loginRes && loginRes?.code === STATUS_CODE.SUCCESS) {
        setLoader(false);
        navigate('/');
        NotificationWithIcon("success", "Registration successful")
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
              Studio Management Suite Registration
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
            <Form.Group className={styles.client} controlId="validationFormik01">
              <Form.Label className={styles.emailAddress}>Company Name</Form.Label>
              <Form.Control
                className={styles.form}
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.name}</p>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.client} controlId="validationFormik01">
              <Form.Label className={styles.emailAddress}>Company Registration Number</Form.Label>
              <Form.Control
                className={styles.form}
                name="registrationNumber"
                type="text"
                value={values.registrationNumber}
                onChange={handleChange}
                isValid={touched.registrationNumber && !errors.registrationNumber}
                isInvalid={!!errors.registrationNumber}
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.registrationNumber}</p>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={styles.client} controlId="validationFormik01">
              <Form.Label className={styles.emailAddress}>User Name</Form.Label>
              <Form.Control
                className={styles.form}
                name="userName"
                type="text"
                value={values.userName}
                onChange={handleChange}
                isValid={touched.userName && !errors.userName}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.userName}</p>
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
            <Form.Group className={styles.client} controlId="validationFormik02">
              <Form.Label className={styles.emailAddress}>Confirm Password</Form.Label>
              <Form.Control
                className={styles.confirmPassword}
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={values.confirmPassword}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                <p>{errors.confirmPassword}</p>
              </Form.Control.Feedback>
            </Form.Group>
            <button className={styles.buttonChild} type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
