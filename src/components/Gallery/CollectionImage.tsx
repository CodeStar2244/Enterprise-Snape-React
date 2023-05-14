import { Image } from "react-bootstrap";
import styles from "./Collection.module.css";
import { useState } from 'react';

interface Props {
    imageUrl: string,
    setSelect: any,
    isSelect: any,
    selectedFiles: any,
    fileId: number,
    setSelectedImages: any,
}

const CollectionImageView = ({ imageUrl, setSelect, isSelect, selectedFiles, setSelectedImages, fileId }: Props) => {

    const [selectImg, setSelectImg] = useState(isSelect)
    const handleClick = () => {
        if (!selectedFiles.includes(fileId)) {
            selectedFiles.push(fileId),
                setSelectedImages(selectedFiles);
            setSelect()

        } else {
            const index = selectedFiles.indexOf(fileId)
            selectedFiles.splice(index, 1);
            setSelectedImages(selectedFiles);
            setSelect()
        }
        setSelectImg(!selectImg)
    }

    return (
        <div className={isSelect ? `${styles.outerimg} ${styles.selectImg}` : `${styles.outerimg}`} draggable onClick={handleClick}>
            <i className="fa-sharp fa-light fa-up-down-left-right anchortag"></i>
            <div className={styles.imgblock}>
                <div className={styles.imgdiv}>
                    <Image className={styles.myimage} src={imageUrl} />
                </div>
            </div>
        </div>
    )
}

export default CollectionImageView