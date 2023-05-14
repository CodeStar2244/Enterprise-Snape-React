import styles from "./AssetRegisteryChartComp.module.css";

interface Props { 
    percentage : string,
    categoryTitle : string,
    backgroundColor:string
}

const AssetRegisteryChartComp = ({percentage,categoryTitle , backgroundColor}:Props) => {
  return (
    <div className={styles.cellphone}>
    <div className={styles.labellegendlight}>
      <div className={styles.labellegendlightChild} style={{backgroundColor : backgroundColor }} />
      <div className={styles.cellPhone}>{categoryTitle}</div>
    </div>
    <div >{[percentage]}</div>
  </div>
  );
};

export default AssetRegisteryChartComp;