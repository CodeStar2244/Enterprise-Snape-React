import { FunctionComponent, useState, useEffect } from "react";
import AssetNavBar from "./AssetNavBar";
import styles from "./AssetDashboardMain.module.css";
import { PieChart } from 'react-minimal-pie-chart';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import AssetRegisteryChartComp from "./AssetRegisteryChartComp";
import AssetRegistryService from "../../api/asset-registry/assetRegistry";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
import { useNavigate } from "react-router-dom";
import { Col, Ratio, Row } from "react-bootstrap";
Chart.register(ArcElement);

const AssetDashboardMain: FunctionComponent = () => {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState(0)
  const [summary, setSummary] = useState({ active: '0', sale: '0', lost: '0', rent: '0' })
  const navigate = useNavigate();
  const data = {
    labels: [
      'Cell Phone',
      'Camera',
      'Screen',
      'Printer'
    ],
    datasets: [{
      label: 'Summary Section',
      data: [30, 34, 6, 30],
      backgroundColor: [
        '#EC1A25',
        '#F9B91B',
        '#FF569A',
        '#252525'
      ],
      hoverOffset: 10,

    }]
  };
  const [categoryData, setCategoryData]: any = useState({})
  const [graphData, setGraphData] = useState(data)

  const getDashboardData = async () => {
    try {
      const res = await AssetRegistryService.getDashBoardData()
      if (res && res?.code === STATUS_CODE.SUCCESS) {
        setCategoryData(res?.result?.categoryData)
        setSummary(res?.result?.summary)
        setTotalAmount(res?.result?.totalAssetAmount)
        setGraphData(
          {
            labels: [
              'Cell Phone',
              'Camera',
              'Screen',
              'Printer'
            ],
            datasets: [{
              label: 'Summary Section',
              data: [
                res?.result?.categoryData?.cell_phone,
                res?.result?.categoryData?.camera,
                res?.result?.categoryData?.screen,
                res?.result?.categoryData?.printer
              ],
              backgroundColor: [
                '#EC1A25',
                '#F9B91B',
                '#FF569A',
                '#252525'
              ],
              hoverOffset: 10,

            }]
          }
        )
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

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <section className={styles.rightcontainer}>
      <AssetNavBar navTitle="Dashboard" />
      <div className={styles.cardssection}>
        <div className={styles.deviceCard}>
          <div className={styles.frameParent}>
            <div className={styles.devicesListedParent}>
              <div className={styles.devicesListed}>Devices Listed</div>
              <div className={styles.deviceNumber}>{summary?.active ? summary?.active : 0}</div>
            </div>
            <i className="fa-solid fa-2xl fa-display"></i>
          </div>
        </div>
        <div className={styles.deviceCard2}>
          <div className={styles.frameParent}>
            <div className={styles.devicesListedParent}>
              <div className={styles.devicesListed}>Devices For Sale</div>
              <div className={styles.deviceNumber}>{summary?.lost ? summary?.lost : 0}</div>
            </div>
            <i className="fa-regular fa-2xl fa-circle-dollar setcolor"></i>
          </div>
        </div>
        <div className={styles.deviceCard2}>
          <div className={styles.frameParent}>
            <div className={styles.devicesListedParent}>
              <div className={styles.devicesListed}>Devices Rented Out</div>
              <div className={styles.deviceNumber}>{summary?.rent ? summary?.rent : 0}</div>
            </div>
            <i className="fa-sharp  fa-2xl  fa-regular fa-arrow-up-from-line setcolor"></i>
          </div>
        </div>
        <div className={styles.deviceCard2}>
          <div className={styles.frameParent}>
            <div className={styles.devicesListedParent}>
              <div className={styles.devicesListed}>Devices Lost</div>
              <div className={styles.deviceNumber}>{summary?.sale ? summary?.sale : 0}</div>
            </div>
            <i className="fa-regular fa-lock-keyhole  fa-2xl  setcolor"></i>
          </div>
        </div>
      </div>
      <div className={styles.summarySection}>
        <Row>
          <Col sm={12} lg={6} md={6} className="mb-5">
            <div className={styles.priceBox}>
              <p>Total Device Value</p>
              <h3>R {totalAmount}</h3>
            </div>
          </Col>
          <Col sm={12} lg={6} md={6}>
            <div className={styles.chartDiv}>
              <Row>
                <Col sm={12} lg={6} md={6}>
                  <div className={styles.graphFigure}>
                    <Doughnut data={graphData} />
                  </div>
                </Col>
                <Col sm={12} lg={6} md={6}>
                  <div className={styles.categorysection}>
                    <div className={styles.cellphoneParent}>
                      <AssetRegisteryChartComp
                        percentage={categoryData?.cell_phone ? `${categoryData?.cell_phone}%` : '0%'}
                        backgroundColor="#EC1A25" categoryTitle="Cell Phone" />
                      <AssetRegisteryChartComp
                        percentage={categoryData?.camera ? `${categoryData?.camera}%` : '0%'}
                        backgroundColor="#F9B91B" categoryTitle="Camera" />
                    </div>
                    <div className={styles.cellphoneParent}>
                      <AssetRegisteryChartComp
                        percentage={categoryData?.screen ? `${categoryData?.screen}%` : '0%'}
                        backgroundColor="#FF569A" categoryTitle="Screen" />
                      <AssetRegisteryChartComp
                        percentage={categoryData?.printer ? `${categoryData?.printer}%` : '0%'}
                        backgroundColor="#252525" categoryTitle="Printer" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

      </div>
    </section>
  );
};

export default AssetDashboardMain;