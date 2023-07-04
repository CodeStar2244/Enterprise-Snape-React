import { useState } from "react";
import AssetNavBar from "./AssetNavBar";
import styles from "./InsuranceQuote.module.css";
import { useNavigate } from "react-router-dom";


const InsuranceQuoteComponent: any = () => {





  return (
    <section className={styles.rightcontainer}>
      <AssetNavBar navTitle="Get Quote" />

      <div className={styles.requestQuoteDiv}>
        <iframe
          style={{ height: "600px", width: "99%", border: "none" }}
          src='https://forms.zohopublic.com/snapeapp/form/InsuranceQuote/formperma/8l0zRSr5w8zz8ePcBK-Y8DhRhi8dhci7Tj62fG6c-YY'>
        </iframe>
      </div>


    </section>
  );
};

export default InsuranceQuoteComponent;