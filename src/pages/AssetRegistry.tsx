import { FunctionComponent } from "react";
import AssetLeftContainer from "../components/AssetRegistry/AssetLeftContainer";
import styles from "./AssetRegistry.module.css";
import Layout from "../components/Layout";
import {
  Outlet,
} from "react-router-dom";

const AssetRegistry: FunctionComponent = () => {
  return (
    <Layout>
      <>
        <div className={styles.assetRegistry}>
          <section className={styles.bottomscreen}>
            <AssetLeftContainer />
            <Outlet />

          </section>
        </div>
      </>
    </Layout>


  );
};

export default AssetRegistry;