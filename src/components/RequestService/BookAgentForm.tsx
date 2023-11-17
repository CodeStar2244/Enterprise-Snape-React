import { useNavigate, useParams } from 'react-router-dom';
import RequestService from '../../api/request-service/requestService';
import styles from './BookAgentStyle.module.css';
import { Field, Formik, useFormikContext } from "formik";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { NotificationWithIcon } from '../../Utils/helper';
import { bookAgentValidations } from '../../Utils/validations';
import { STATUS_CODE, VALIDATIONS } from '../../Utils/constants';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Constants from '../../Config/Constants';

const BookAgentComponent = () => {
  const { id }: any = useParams();
  const formData: { [key: string]: any } = useSelector((state: any) => state.bookingDetailsReducer);
  const [loader, setLoader] = useState<boolean>(true);
  const [agent, setAgent] = useState<any>(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAgentDetail();
    
  }, []);

  const getAgentDetail = async () => {
    const { agent } = (await RequestService.getAgentById(id)).result;
    const { agent : category } = (await RequestService.getAgentCategoryById(id)).result;
    setCategories(category || []);
    
    setAgent(agent);
    setLoader(false)
  }

  const onEndTimeChange = async () => {
    
  }

  const onStartTimeChange =async () => {
    
  }

  const navigate = useNavigate();

  const onCancel = () => {
    navigate('/request-service');
  }

  const handleSubmit = async (values: any) => {
    setLoader(true);
    try {
      values = JSON.parse(JSON.stringify(values))
      const start = values.bookingStartDateTime.split(":");
      const end = values.bookingEndDateTime.split(":");
      values.bookingStartDateTime = moment(values.bookingDate).set('hours', start[0]).set('hours', start[1]);
      values.bookingEndDateTime = moment(values.bookingDate).set('hours', end[0]).set('hours', end[1]);
      values.latitude = formData.latitude;
      values.longitude = formData.longitude;
      const loginRes = await RequestService.bookAgent(id, values)
      if (loginRes && loginRes?.code === STATUS_CODE.SUCCESS) {
        setLoader(false);
        navigate('/request-service');
        NotificationWithIcon("success", "Agent booked successfully")
      }
    } catch (err: any) {
      setLoader(false);
      NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
    }
  }

  const toggleCategory = (form: any, field: any, category: any) => {
    let old = field.value?.length ? [...field.value] : [];
    if(old.includes(category.id)){
      old = old.filter((item: any)=> item != category.id);
    }else{
      old.push(category.id)
    }
    form.setFieldValue("categories", old)
  }


  return (
    <div className={styles.customFormContainer}>
      {loader ? <Loader /> :
        <>
          <h3> Book Agent</h3>
          <Formik
            enableReinitialize={true}
            initialValues={formData}
            onSubmit={handleSubmit}
            validationSchema={bookAgentValidations}>
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
            }: any) =>
              (<Form onSubmit={handleSubmit} className={styles.customForm} >
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
                    <option value="3">Both</option>
                    <option value="1">Photographer</option>
                    <option value="2">Videographer</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    <p>{touched.speciality ? errors.speciality : ""}</p>
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
                    <p>{touched.bookingDate ? errors.bookingDate : ""}</p>
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
                    <p>{touched.bookingStartDateTime ? errors.hours : ""}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    name="bookingStartDateTime"
                    type="time"
                    value={values.bookingStartDateTime}
                    onChange={handleChange}
                    onInput={onStartTimeChange}
                    isValid={touched.bookingStartDateTime && !errors.bookingStartDateTime}
                    isInvalid={touched.bookingStartDateTime && !!errors.bookingStartDateTime}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{touched.bookingStartDateTime ? errors.bookingStartDateTime : ""}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.formGroup} controlId="validationFormik01">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    name="bookingEndDateTime"
                    type="time"
                    value={values.bookingEndDateTime}
                    onChange={handleChange}
                    onInput={onEndTimeChange}
                    isValid={touched.bookingEndDateTime && !errors.bookingEndDateTime}
                    isInvalid={touched.bookingEndDateTime && !!errors.bookingEndDateTime}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{touched.bookingEndDateTime ? errors.bookingEndDateTime : ""}</p>
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

                {/* <div className={styles.categories} >
                  {categories.map((category: any)=>
                  <div className="center" key={category.id} onClick={()=>toggleCategory(category)} >
                    <img src={Constants.adminbackendUrl + category.image} />
                    <div className={`center ${styles.txt}`}>{category.categories_title}</div>
                  </div>
                  )}
                </div> */}

                <Field name="categories">
                    {({ field, form, meta }: any) => (
                  <div className={styles.categories} >
                  {categories.map((category: any)=>
                  <div className="center" key={category.id} onClick={()=>toggleCategory(form, field, category)} >
                    <img src={Constants.adminbackendUrl + category.image} />
                    <i className={`fa-regular fa-circle-check ${styles.icon} ${ field.value?.includes(category.id) ? styles.selected: ''}`}></i>
                    <div className={`center ${styles.txt}`}>{category.categories_title}</div>
                  </div>
                  )}
                  </div>
                    )}
                </Field>

                <Form.Group className={styles.fullFormGroup} controlId="validationFormik01">
                  <Form.Label>Brief</Form.Label>
                  <Form.Control
                    name="brief"
                    as="textarea" 
                    rows={3}
                    value={values.brief}
                    onChange={handleChange}
                    placeholder='Enter Event Details in brief'
                    isValid={touched.brief && !errors.brief}
                    isInvalid={touched.brief && !!errors.brief}
                  />
                  <Form.Control.Feedback type="invalid">
                    <p>{touched.brief ? errors.brief : ""}</p>
                  </Form.Control.Feedback>
                </Form.Group>

                <div className={`d-flex ${styles.fullFormGroup}`}>
                  <button className="default-btn me-4" type="submit">Book</button>
                  <button onClick={onCancel} className="default-btn second-btn" type="button">Cancel</button>
                </div>
              </Form>)
            }
          </Formik>
        </>
      }
    </div>
  )
}

export default BookAgentComponent;