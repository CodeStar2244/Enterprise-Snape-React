import { FunctionComponent, useCallback, useRef, useState } from "react";
import { Button, Container, Row, Col, Nav, NavItem } from "react-bootstrap";
import NavBarComponent from "./NavbarComponent";
import TopBarComponent from "./TopBarComponent";
import styles from "./Layout.module.css";
import Gallery from "react-photo-gallery";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { truncate } from "fs/promises";
import { useDispatch, useSelector } from "react-redux";
import { clientGalleryViewAction } from "../redux/actions/clientGalleryViewAction";
import CollectionService from "../api/Collection/collection";



interface Props {
    children: JSX.Element;
}

const Grid = (props:any) => {
    const images = props.imagesArr ? props.imagesArr:[];
    const [currentImage, setCurrentImage] = useState(0);
    const dispatch = useDispatch();
    const imageGalleryRef = useRef<any>(null)
    const clientState = useSelector((state: any) => state.clientCollectionViewReducer);
    const newData:any = [];
    for(const image of images){
        newData.push({
            src:image.url,
            height:image.height,
            width:image.width
        })
    }
    const openLightbox = useCallback((event:any, { photo, index }:any) => {
        dispatch(clientGalleryViewAction({isSlideShow:false,isViewOpen:true}))
        setCurrentImage(index);
      }, []);
    
      const closeLightbox = () => {
        dispatch(clientGalleryViewAction({isSlideShow:false,isViewOpen:false}))
        setCurrentImage(0);
      };
    const downloadFile= async(fileId:any)=>{
      try {
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);
      const currentFileIndex = imageGalleryRef.current.getCurrentIndex();
      const file = images[currentFileIndex];
      const response = await CollectionService.downloadFile({pin:"2083"},file.id);
      const blobFile = new Blob([response?.data],{type: response.headers.fileext});
      const url = window.URL.createObjectURL(blobFile);
      a.href = url;
      a.setAttribute("download", response.headers.filename); 
      a.click();
      window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error)
      }
      

    }
   
    return (
        <div className={styles.maincomp}>

            {clientState.isViewOpen?
            <div className={styles.ImageGalleryMainDiv}>
            <i className="fa-sharp fa-regular fa-circle-xmark fa-2xl cancelImageBtn" onClick={closeLightbox} style={{cursor: "pointer"}}></i>
            <i className="fa-regular fa-arrow-down-to-line fa-2xl clientDownloadBtn " onClick={e=>downloadFile(currentImage)}></i>
            <div className={styles.ImageGalleryDiv}>
            <ImageGallery items={newData.map((image:any)=>{
                return {
                 original:image.src,
                 thumbnail:image.src,
                 description:image.src,
                 originalTitle:image.src
                
                }
            })} swipingTransitionDuration={3}  
             slideDuration={500} 
             ref={imageGalleryRef}
             slideInterval={1000} 
             startIndex={currentImage} autoPlay={clientState.isSlideShow} showNav={true} lazyLoad/>
            </div>
            </div>
            :
            <Gallery photos={newData} onClick={openLightbox} columns={4} margin={props.gridSpacing === "large" ? 8:3}  direction={props.gridStyle} />
            }
           
        
            
        </div>
    );
};

export default Grid;
