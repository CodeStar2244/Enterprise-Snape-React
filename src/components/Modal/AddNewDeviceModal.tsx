import { ChangeEventHandler, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from "./CreateCollectionModal.module.css";
import { Formik } from "formik";
import { assetDeviceValidation } from "../../Utils/validations";
import AssetRegistryService from "../../api/asset-registry/assetRegistry";
import { STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";

function AddNewDeviceModal(props: any) {

    let formInitialValues = {
        type: props?.details?.type ? props?.details?.type : "CELL_PHONE" as string,
        nickName: props?.details?.nickName ? props?.details?.nickName as string : "" as string,
        deviceID: props?.details?.deviceID ? props?.details?.deviceID as string : "" as string,
        deviceAmount: props?.details?.deviceAmount ? props?.details?.deviceAmount as string : "" as string
    }

    const [loader, setLoader] = useState<boolean>(false);

    const handleSubmit = async (values: any) => {
        try {
            if (props?.createnew) {
                setLoader(true);
                const res = await AssetRegistryService.createDevice(values)
                if (res && res?.code === STATUS_CODE.SUCCESS) {
                    setLoader(false);
                    NotificationWithIcon("success", "Device added")
                    props.onHide()
                }
            } else {
                props.updateDevice(values)
            }
        } catch (err: any) {
            setLoader(false);
            NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
        }

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="addNewDeviceModal"
        >
            <Modal.Body className={styles.maincomp}>
                <div className={styles.maintitlediv}>
                    <p className={styles.maintitle}>Add New Device</p>
                </div>
                <Formik
                    initialValues={formInitialValues}
                    onSubmit={handleSubmit}
                    validationSchema={assetDeviceValidation}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form className={styles.formdiv} onSubmit={handleSubmit}>
                            <div className={styles.formcomp}>
                                <Form.Label className={styles.formlabel}>Device Type</Form.Label>
                                <Form.Select placeholder="Device Type"
                                    value={values.type}
                                    onChange={handleChange}
                                    name="type"
                                    isValid={touched.type && !errors.type}
                                    isInvalid={!!errors.type}
                                >
                                    <option value="CELL_PHONE" title="Cell Phone">Cell Phone</option>
                                    <option value="CAMERA" title="Camera">Camera</option>
                                    <option value="SCREEN" title="Screen">Screen</option>
                                    <option value="PRINTER" title="Printer">Printer</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    <p></p>
                                </Form.Control.Feedback>
                            </div>
                            <div className={styles.formcomp}>
                                <Form.Label className={styles.formlabel}>Device NickName</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="input"
                                        value={values.nickName}
                                        name="nickName"
                                        placeholder="Device Nick Name"
                                        onChange={handleChange}
                                        isValid={touched.nickName && !errors.nickName}
                                        isInvalid={!!errors.nickName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <p>{errors.nickName}</p>
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </div>
                            <div className={styles.formcomp}>
                                <Form.Label className={styles.formlabel}>IMEI Number</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="input"
                                        value={values.deviceID}
                                        name="deviceID"
                                        placeholder="IMEI Number"
                                        onChange={handleChange}
                                        isValid={touched.deviceID && !errors.deviceID}
                                        isInvalid={!!errors.deviceID}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <p>{errors.deviceID}</p>
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </div>
                            <div className={styles.formcomp}>
                                <Form.Label className={styles.formlabel}>Device Amount</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="number"
                                        value={values.deviceAmount}
                                        name="deviceAmount"
                                        placeholder="Device Amount"
                                        onChange={handleChange}
                                        isValid={touched.deviceAmount && !errors.deviceAmount}
                                        isInvalid={!!errors.deviceAmount}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <p>{errors.deviceAmount}</p>
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </div>
                            <div className={styles.buttondiv}>
                                <Button className={styles.cancelbtn} onClick={props.onHide} variant="custom">Cancel</Button>
                                {
                                    loader ?
                                        <Button className={styles.createbtn} variant="custom" disabled type="submit">Adding...</Button> :
                                        props.createnew ?
                                            <Button className={styles.createbtn} variant="custom" type="submit">Add</Button> :
                                            <Button className={styles.createbtn} variant="custom" type="submit">Save</Button>
                                }
                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default AddNewDeviceModal;
