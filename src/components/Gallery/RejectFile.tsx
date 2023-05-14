import styles from './SingleFileUpload.module.css'

function RejectFile({ filedata, fileerror }: any) {

    return (
        <>
            <div className={styles.maindiv}>
                <div className={styles.music}>
                    <div className={styles.loader}>
                        <i className="fa-solid uploadcolor fa-exclamation"></i>
                    </div>
                    <div className={styles.name}>
                        {filedata.name}
                    </div>
                    <div className={styles.progesssection}>
                        {
                            fileerror && fileerror.length ? fileerror[0] : ' File type not allowed'
                        }
                    </div>
                    <div className={styles.filesize}>{(filedata?.size / 1024 ** 2).toFixed(2)} MB</div>
                </div>
            </div>
        </>
    );
}

export default RejectFile;