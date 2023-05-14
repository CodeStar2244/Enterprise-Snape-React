import { width } from "@mui/system";
import { FunctionComponent, useState, useEffect } from "react";
import Grid from "../Grid";
import CustomDropdownItem from "./CustomDropdownItem";
import styles from "./Design.module.css"
import DesignCollectionNav from "./DesignCollectionNav";
import DesignCollectionNavMobile from "./DesignCollectionNavMobile";
import GridVerticalMobile from "./GridVerticalMobile";
import GridVerticalPc from "./GridVerticalPc";
import { useSelector, useDispatch } from 'react-redux'
import { Image } from "react-bootstrap";

const DisplayCollection: FunctionComponent = () => {

    const [grid, setGrid] = useState("Vertical")
    const [space, setSpace] = useState("Regular")
    const [theme, setTheme] = useState({ id: 1, name: 'light', background: '#FFFFFF', accent: '#F5F5F5', button: '#333333' })

    const myState = useSelector((state: any) => state.changeDesign)

    useEffect(() => {
        setGrid(myState.gridStyle)
        setSpace(myState.gridSpacing)
        setTheme(myState.theme)
    }, [myState])


    return (
        <>
            <div className={styles.sample}>
                <div
                    className={styles.pcscreen}
                    style={theme ? {
                        backgroundColor: theme.background
                    } :
                        { backgroundColor: "white" }
                    }
                >
                    {/* {myState.changeDesign.gridstyle} */}
                    <DesignCollectionNav theme={theme} />
                    {/* <GridVerticalPc /> */}
                    {
                        (grid === "column" && space === "regular") ?
                            < Image fluid src="../../gridverticalregular.png" /> :
                            (
                                (grid === "column" && space === "large") ?
                                    < Image fluid src="../../gridverticallarge.png" /> :
                                    (
                                        (grid === "row" && space === "regular") ?
                                            < Image fluid src="../../grridhorizontalregular.png" /> :
                                            (
                                                < Image fluid src="../../gridhorizontallarge.png" />
                                            )
                                    )
                            )
                    }
                </div>
                <div
                    className={styles.mobilescreen}
                    style={theme ? {
                        backgroundColor: theme.background
                    } : { backgroundColor: "white" }}
                >
                    <div className={styles.mobiletitlediv}>
                        <DesignCollectionNavMobile theme={theme} />
                        {/* <GridVerticalMobile /> */}
                        {
                            (grid === "column" && space === "regular") ?
                                < Image fluid src="../../gridverticalregularmobile.png" /> :
                                (
                                    (grid === "column" && space === "large") ?
                                        < Image fluid src="../../grridverticallargemobile.png" /> :
                                        (
                                            (grid === "row" && space === "regular") ?
                                                < Image fluid src="../../grridhorizontalregularmobile.png" /> :
                                                (
                                                    < Image fluid src="../../grridhorizontallargemobile.png" />
                                                )
                                        )
                                )
                        }
                    </div>
                </div>

            </div>
        </>
    );
};

export default DisplayCollection;
