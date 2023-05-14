import React from 'react';
import styles from "./AssetTableNameComp.module.css";

interface Props {
    name:string
}

const AssetTableNameComp = ({name}:Props) => {
  return (
    <div className={styles.nameDiv}>
       <img src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-img-file-document-icon-png-image_4165020.jpg" className={styles.imgStyle} alt="" />
       {name}
    </div>
  )
}

export default AssetTableNameComp