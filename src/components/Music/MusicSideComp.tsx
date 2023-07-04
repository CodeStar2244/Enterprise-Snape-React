import { FunctionComponent } from "react";
import { Button, Container, Form } from "react-bootstrap";
import styles from "./MusicSideComp.module.css"

const MusicSideComp: FunctionComponent = () => {
    return (
        <>
            <div className={styles.maincomp}>
                <Form>
                    <button className={styles.leftDivButton}>
                        <i className="fa-regular fa-house setcolorwhite"></i>
                        <div className={styles.leftDivButtonTextWhite}>Filters</div>
                    </button>
                    <div className={styles.checkboxgroup}>
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Acoustic" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Ambient" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Blues" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Children" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Acoustic" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Ambient" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Blues" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Children" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Acoustic" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Ambient" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Blues" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Children" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Acoustic" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Ambient" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Blues" />
                        <Form.Check type="checkbox" className={styles.singlecheckbox} label="Children" />
                    </div>
                </Form>
            </div>
        </>
    );
};

export default MusicSideComp;
