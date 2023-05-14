import Moment from 'react-moment';
import AssetActiveComp from './AssetActiveComp'
import AssetTableNameComp from './AssetTableNameComp';
import styles from "./DeviceListRowComponent.module.css"
import { NavDropdown } from 'react-bootstrap';
import AssetRegistryService from '../../api/asset-registry/assetRegistry';
import { MESSAGE, STATUS_CODE, VALIDATIONS } from '../../Utils/constants';
import { NotificationWithIcon } from '../../Utils/helper';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddNewDeviceModal from '../Modal/AddNewDeviceModal';
interface Props {
  product: any
}

const DeviceListRowComponent = ({ product }: Props) => {

  const deviceTypeName: any = {
    "CELL_PHONE": "Cell Phone",
    "CAMERA": "Camera",
    "SCREEN": "Screen",
    "PRINTER": "Printer",
  }

  const [deviceInfo, setDeviceInfo]: any = useState()
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    setDeviceInfo(product)
  }, [product])
  const navigate = useNavigate()

  const updateDevice = async (data: any) => {
    try {
      const res = await AssetRegistryService.updateDevice(product?.id, data)
      if (res && res?.code === STATUS_CODE.SUCCESS) {
        setDeviceInfo(res?.result)
        setModalShow(false)
        NotificationWithIcon("success", 'Details updated')
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

    <tr className={styles.tableData}>
      <td><AssetTableNameComp name={deviceInfo?.nickName} /></td>
      <td><div className={styles.tableDiv}>{deviceTypeName[deviceInfo?.type]}</div></td>
      <td><div className={styles.tableDiv}><Moment format="MMMM  Do, YYYY">{deviceInfo?.updatedAt}</Moment></div></td>
      <td><AssetActiveComp active={deviceInfo?.status} /></td>
      <td>
        <div className={styles.tableDiv}>
          <NavDropdown
            align="end"
            title={<i className="fa-regular fa-ellipsis setcolorgallery galleryicon"></i>}
            className={styles.navdropdown} id="collasible-nav-dropdown gallerydropdown">
            <NavDropdown.Item onClick={() => setModalShow(true)}>
              <div className={styles.navicons}>
                <i className="fa-sharp fa-regular assetediticons fa-pencil"></i>
                <div className={styles.navtags}>Quick Edit</div>
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => { updateDevice({ status: 'Lost' }) }}>
              <div className={styles.navicons}>
                <i className="fa-solid assetediticons fa-link"></i>
                <div className={styles.navtags}> Status - Lost</div>
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => { updateDevice({ status: 'For Rent' }) }}>
              <div className={styles.navicons}>
                <i className="fa-solid assetediticons fa-link"></i>
                <div className={styles.navtags}> Status - Rent</div>
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => { updateDevice({ status: 'For Sell' }) }}>
              <div className={styles.navicons}>
                <i className="fa-solid assetediticons fa-link"></i>
                <div className={styles.navtags}> Status - Sale</div>
              </div>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </td>
      <AddNewDeviceModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        createnew={false}
        details={deviceInfo}
        updateDevice={updateDevice}
      />
    </tr>
  )
}

export default DeviceListRowComponent