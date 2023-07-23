import { useNavigate, useParams } from 'react-router-dom';
import RequestService from '../../api/request-service/requestService';
import styles from './BookAgentStyle.module.css';
import { Formik } from "formik";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { NotificationWithIcon } from '../../Utils/helper';
import { bookAgentValidations } from '../../Utils/validations';
import { STATUS_CODE, VALIDATIONS } from '../../Utils/constants';
import Loader from '../Loader/Loader';

const BookAgentComponent = () => {
  const { id }: any = useParams();
  const [loader, setLoader] = useState<boolean>(true);
  const [agent, setAgent] = useState<any>(null);

  useEffect(()=>{
    getAgentDetail();
  }, []);

  const getAgentDetail = async () => {
    const { agent } = (await RequestService.getAgentById(id)).result;
    setAgent(agent);
    setLoader(false)
  }

  const data = {
    "bookingDate": "2023-07-23",
    "bookingStartDateTime": "2023-07-23 10:00:00",
    "bookingEndDateTime": "2023-07-23 16:00:00",
    "hours": 6,
    "address1":"Ahmedabad",
    "speciality": 1
  }
  const daaa = {
    "bookingDate":"2023-07-22",
    "bookingStartDateTime":"2023-07-22 20:00:00",
    "bookingEndDateTime":"2023-07-22 22:00:00",
    "hours":"2",
    "address1":"Ahmedabad",
    "latitude":"22.988",
    "longitude":"83.988",
    "speciality":2
  }

  const onSubmit = async ()=>{
    
  }


  let formInitialValues = {
    bookingDate: "",
    bookingStartDateTime: "",
    bookingEndDateTime: "",
    hours: "5",
    address1: "",
    address2: "",
    speciality: 2
  }
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoader(true);
    try {
      const location = await RequestService.getCurrentLocation();
      const loginRes = await RequestService.bookAgent(id, data)
      if (loginRes && loginRes?.code === STATUS_CODE.SUCCESS) {
        setLoader(false);
        navigate('/');
        NotificationWithIcon("success", "Registration successful")
      }
    } catch (err: any) {
      setLoader(false);
      NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS .SOMETHING_WENT_WRONG)
    }
  }


  return (
    <div className={`${styles.customFormContainer} w-100 center flex-column`}>
      {loader && <Loader />}
      <h3> Book Agent</h3>
      <Formik
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          validationSchema={bookAgentValidations}>
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            isValid,
            errors,
          }) => (
              <Form onSubmit={handleSubmit} className={styles.customForm} >
                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>Agent Name</Form.Label>
                  <Form.Control
                    name="agentName"
                    type="text"
                    value={agent.firstname + " " + agent.lastname}
                    readOnly={true}
                    disabled={true}
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>Speciality</Form.Label>
                  <Form.Control
                    name="speciality"
                    as="select"
                    role="button"
                    value={values.speciality}
                    onChange={handleChange}
                    isValid={touched.speciality && !errors.speciality}
                    isInvalid={touched.speciality && !!errors.speciality}
                  >
                    <option value="1">Both</option>
                    <option value="2">Photographer</option>
                    <option value="3">Videographer</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.speciality}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>Booking Date</Form.Label>
                  <Form.Control
                    name="bookingDate"
                    type="date"
                    role="button"
                    value={values.bookingDate}
                    onChange={handleChange}
                    isValid={touched.bookingDate && !errors.bookingDate}
                    isInvalid={touched.bookingDate && !!errors.bookingDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.bookingDate}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>Hours</Form.Label>
                  <Form.Control
                    name="hours"
                    type="number"
                    value={values.hours}
                    onChange={handleChange}
                    isValid={touched.hours && !errors.hours}
                    isInvalid={touched.hours && !!errors.hours}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.hours}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    name="bookingStartDateTime"
                    type="time"
                    value={values.bookingStartDateTime}
                    onChange={handleChange}
                    isValid={touched.bookingStartDateTime && !errors.bookingStartDateTime}
                    isInvalid={touched.bookingStartDateTime && !!errors.bookingStartDateTime}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.bookingStartDateTime}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    name="bookingEndDateTime"
                    type="time"
                    value={values.bookingEndDateTime}
                    onChange={handleChange}
                    isValid={touched.bookingEndDateTime && !errors.bookingEndDateTime}
                    isInvalid={touched.bookingEndDateTime && !!errors.bookingEndDateTime}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{errors.bookingEndDateTime}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.fullFormGroup} controlId="validationFormik01">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    name="address1"
                    type="text"
                    value={values.address1}
                    onChange={handleChange}
                    isValid={touched.address1 && !errors.address1}
                    isInvalid={touched.address1 && !!errors.address1}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{touched.address1 ? errors.address1 : ""}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.fullFormGroup} controlId="validationFormik01">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    name="address2"
                    type="text"
                    value={values.address2}
                    onChange={handleChange}
                    isValid={touched.address2 && !errors.address2}
                    isInvalid={touched.address2 && !!errors.address2}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{touched.address2 ? errors.address2 : ""}</p>
                  </Form.Control.Feedback>
                </Form.Group>
                
                <div className={`d-flex ${styles.fullFormGroup}`}>
                  <button className="default-btn me-4" type="submit">Book</button>
                  <button className="default-btn second-btn" type="button">Cancel</button>
                </div>
              </Form>
          )}
        </Formik>
    </div>
  )
}

export default BookAgentComponent;