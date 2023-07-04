import { FunctionComponent } from "react";
import AssetLeftContainer from "../components/AssetRegistry/AssetLeftContainer";
import styles from "./AssetRegistry.module.css";
import Layout from "../components/Layout";
import {
  Outlet,
} from "react-router-dom";

const AssetRegistry: FunctionComponent = () => {
  const buttonData = [
    {
      id: 1,
      to: "",
      iconActive: "fa-regular fa-house setsizeasset",
      iconInactive: "fa-regular fa-house setcolor",
      text: "Dashboard",
    },
    {
      id: 2,
      to: "device-list",
      iconActive: "fa-regular fa-envelope setsizeasset",
      iconInactive: "fa-regular fa-envelope setcolor",
      text: "My Devices",
    },
    {
      id: 3,
      to: "get-cover",
      iconActive: "fa-regular fa-user setsizeasset",
      iconInactive: "fa-regular fa-user setcolor",
      text: "Get Cover",
    },
    {
      id: 4,
      to: "for-sale",
      iconActive: "fa-regular fa-circle-dollar setsizeasset",
      iconInactive: "fa-regular fa-circle-dollar setcolor",
      text: "Products For Sale",
    },
    {
      id: 5,
      to: "for-rent",
      iconActive: "fa-regular fa-grid-2 setsizeasset",
      iconInactive: "fa-regular fa-grid-2 setcolor",
      text: "Products For Rent",
    },  
  ];
  return (
    <Layout>
      <>
        <div className={styles.assetRegistry}>
          <section className={styles.bottomscreen}>
            <AssetLeftContainer buttonData={buttonData} />
            <Outlet />

          </section>
        </div>
      </>
    </Layout>


  );
};

export default AssetRegistry;