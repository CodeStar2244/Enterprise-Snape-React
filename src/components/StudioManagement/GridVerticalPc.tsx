import styles from "./Layout.module.css";
import Gallery from "react-photo-gallery";


interface Props {
    children: JSX.Element;
}
const data = [
    { src: "../../images15.jpg", height: 0, width: 0 }, { src: "../../sample2.jpg", height: 0, width: 0 }, { src: "../../images11.jpg", height: 0, width: 0 }, { src: "../../images12.jpg", height: 0, width: 0 },
    { src: "../../images13.jpg", height: 0, width: 0 }, { src: "../../images14.jpg", height: 0, width: 0 },
];
const newData = [
    {
        "src": "../../images15.jpg",
        "height": 53,
        "width": 53
    },
    {
        "src": "../../sample2.jpg",
        "height": 80,
        "width": 53
    },
    {
        "src": "../../images11.jpg",
        "height": 30,
        "width": 53
    },
    {
        "src": "../../images12.jpg",
        "height": 40,
        "width": 53
    },
    {
        "src": "../../images13.jpg",
        "height": 71,
        "width": 53
    },
    {
        "src": "../../images15.jpg",
        "height": 53,
        "width": 53
    },
    {
        "src": "../../sample2.jpg",
        "height": 80,
        "width": 53
    },
    {
        "src": "../../images11.jpg",
        "height": 30,
        "width": 53
    },
    {
        "src": "../../images12.jpg",
        "height": 40,
        "width": 53
    },
    {
        "src": "../../images13.jpg",
        "height": 71,
        "width": 53
    },
    {
        "src": "../../images15.jpg",
        "height": 53,
        "width": 53
    },
    {
        "src": "../../sample2.jpg",
        "height": 80,
        "width": 53
    },
    {
        "src": "../../images11.jpg",
        "height": 30,
        "width": 53
    },
    {
        "src": "../../images12.jpg",
        "height": 40,
        "width": 53
    },
    {
        "src": "../../images13.jpg",
        "height": 71,
        "width": 53
    },
]


const GridVerticalPc = () => {
    return (
        <div className={styles.maincomp}>
            <Gallery photos={newData} columns={4} direction="column" />
            <Gallery photos={newData} />
        </div>
    );
};

export default GridVerticalPc;
