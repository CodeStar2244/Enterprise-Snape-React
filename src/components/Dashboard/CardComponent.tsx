import styles from "./CardComponent.module.css"

interface Props {
  topTitle: string,
  middleTitle: number,
  bottomTitle: string,
  backgroudBox: string,
  iconImage: string,
  classname: string


}

const CardComponent = ({ classname, topTitle, middleTitle, bottomTitle, backgroudBox, iconImage }: Props) => {
  return (
    <div className={styles[`${classname}`]}>
      <div className={styles.rectangleParent}>
        <div className={styles.clientsGroup}>
          <p>{topTitle}</p>
          <p>{middleTitle}</p>
          <p>{bottomTitle}</p>
        </div>
        <div className={styles.rectangleGroup}>
          <img
            className={styles.frameItem}
            alt=""
            src={backgroudBox}
          />
          <img
            className={styles.h38ch38bm0014iconset0111}
            alt=""
            src={iconImage}
          />
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
