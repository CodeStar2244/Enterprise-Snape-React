import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AssetActiveComp from "./AssetActiveComp";
import AssetNavBar from "./AssetNavBar";
import AssetTableNameComp from "./AssetTableNameComp";
import styles from "./DeviceList.module.css";
import DeviceListRowComponent from "./DeviceListRowComponent";
import AssetRegistryService from "../../api/asset-registry/assetRegistry";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
import { useNavigate } from "react-router-dom";
import AssetRegistryLoader from "../Loader/AssetRegistryLoader";



const ForSaleList: FunctionComponent = () => {

  const deviceListName: any = {
    CELL_PHONE: "Cell Phone",
    CAMERA: "Camera",
    SCREEN: "Screen",
    PRINTER: "Printer"
  }

  const navigate = useNavigate();


  const [list, setList]: any = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getList()
  }, [])

  const getList = async (query?: any) => {
    try {
      setLoader(true)
      const res = await AssetRegistryService.getDeviceList("For Sale", query)
      if (res && res?.code === STATUS_CODE.SUCCESS) {
        setLoader(false)
        setList(res?.result)
      }
    } catch (err: any) {
      if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
        NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
        navigate('/');
      } else {
        NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
      }
    }
  }


  return (
    <section className={styles.rightcontainer}>
      <AssetNavBar navTitle="Sale Devices" setdevicelist={getList} />

      <div className={styles.deviceListComp}>
        <Table striped >
          <thead>
            <tr className={styles.tableHeading}>
              <td>File Name</td>
              <td>File Items</td>
              <td>Last Modified</td>
              <td>Device Status</td>
            </tr>
          </thead>
          {
            loader ?
              <AssetRegistryLoader />
              :
              <tbody>
                {
                  list && list.length ? list.map((product: any) => (
                    <DeviceListRowComponent
                      key={product.id}
                      product={product}
                    />
                  ))
                    :
                    <>
                    </>
                }
              </tbody>
          }
        </Table>
      </div>


    </section>
  );
};

export default ForSaleList;