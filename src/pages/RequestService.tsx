import { FunctionComponent } from "react";
import AssetLeftContainer from "../components/AssetRegistry/AssetLeftContainer";
import styles from "./AssetRegistry.module.css";
import Layout from "../components/Layout";
import {
  Outlet,
} from "react-router-dom";

const RequestService: FunctionComponent = () => {
  const buttonData = [
    {
      id: 1,
      to: "",
      iconActive: "fa-regular fa-house setsizeasset",
      iconInactive: "fa-regular fa-house setcolor",
      text: "Request",
    },
    {
      id: 2,
      to: "favourites",
      iconActive: "fa-regular fa-user setsizeasset",
      iconInactive: "fa-regular fa-user setcolor",
      text: "Favourites",
    },
    {
      id: 3,
      to: "bookings",
      iconActive: "fa-regular fa-calendar setsizeasset",
      iconInactive: "fa-regular fa-calendar setcolor",
      text: "Bookings",
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

export default RequestService;