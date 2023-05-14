import { FunctionComponent, useState, useEffect } from "react";
import { Col, Dropdown, Form, FormLabel, Image, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { designAction, setAllDesign } from "../../redux/actions/designStyle";
import CustomDropdownItem from "./CustomDropdownItem";
import styles from "./Design.module.css"
import DesignSideScreen from "./DesignSideScreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";

const font: any = {

    Sans: {
        fontWeight: "700",
        fontFamily: "'Montserrat', sans-serif"
    },

    Serif: {
        fontWeight: "500",
        fontFamily: "'Cormorant,serif'"
    },

    Modern: {
        fontWeight: "500",
        fontFamily: "'Tenor Sans', sans-serif"
    },

    Timeless: {
        fontWeight: "500",
        fontFamily: "'Spectral', serif"
    },

    Bold: {
        fontWeight: "500",
        fontFamily: "'Syne', sans-serif"
    },

    Subtle: {
        fontWeight: "700",
        fontFamily: "'Montserrat', sans-serif"
    }
}

const Sans = {
    fontWeight: "700",
    fontFamily: "'Montserrat', sans-serif"
}

const Serif = {
    fontWeight: "500",
    fontFamily: "'Cormorant,serif'"
}

const Modern = {
    fontWeight: "500",
    fontFamily: "'Tenor Sans', sans-serif"
}

const Timeless = {
    fontWeight: "500",
    fontFamily: "'Spectral', serif"
}

const Bold = {
    fontWeight: "500",
    fontFamily: "'Syne', sans-serif"
}

const Subtle = {
    fontWeight: "700",
    fontFamily: "'Montserrat', sans-serif"
}

const activeStyle = {
    border: "1px solid crimson"
}

// {id: 2, name: 'gold', background: '#FFFEFA', accent: '#FCF8F2', button: '#9E8962'}

// const light = ["#FFFFFF", "#F5F5F5", "#333333"]
const light = { id: 1, name: 'light', background: '#FFFFFF', accent: '#F5F5F5', button: '#333333' }
// const gold = ["#FFFEFA", "#FCF8F2", "#9E8962"]
const gold = { id: 2, name: 'gold', background: '#FFFEFA', accent: '#FCF8F2', button: '#9E8962' }
// const rose = ["#FBF8F7", "#F8F3F2", "#9E7977"]
const rose = { id: 3, name: 'rose', background: '#FBF8F7', accent: '#F8F3F2', button: '#9E7977' }
// const terracotta = ["#FBF7F4", "#F3ECE7", "#9E765D"]
const terracotta = { id: 4, name: 'terracotta', background: '#FBF7F4', accent: '#F3ECE7', button: '#9E765D' }
// const sand = ["#F5F2F0", "#E9E4E2", "#9E8B7D"]
const sand = { id: 5, name: 'sand', background: '#F5F2F0', accent: '#E9E4E2', button: '#9E8B7D' }
// const olive = ["#F6F6F3", "#EDECE8", "#9D9E7E"]
const olive = { id: 6, name: 'olive', background: '#F6F6F3', accent: '#EDECE8', button: '#9D9E7E' }
// const agave = ["#F5F6F5", "#EDF0ED", "#869E94"]
const agave = { id: 7, name: 'agave', background: '#F5F6F5', accent: '#EDF0ED', button: '#869E94' }
// const sea = ["#FAFAFA", "#EAECEE", "#93939F"]
const sea = { id: 8, name: 'sea', background: '#FAFAFA', accent: '#EAECEE', button: '#93939F' }
// const dark = ["#1E1E1E", "#282828", "#4D4D4D"]
const dark = { id: 9, name: 'dark', background: '#1E1E1E', accent: '#282828', button: '#4D4D4D' }

const Design: FunctionComponent = () => {
    const { collectionId } = useParams()
    const [fontStyle, setFontStyle] = useState(Sans)
    const [fontName, setFontName] = useState("Sans")

    const [grid, setGrid] = useState("column")
    const [space, setSpace] = useState("regular")

    const [backgroundStyle, setBackgroundStyle] = useState({ id: 1, name: 'light', background: '#FFFFFF', accent: '#F5F5F5', button: '#333333' })
    // const [backgroundName, setBackgroundName] = useState("light")

    const selectFontStyle = (fontname: any, styleName: any) => {
        updateData({ typography: fontname }).then(() => {
            setFontStyle(styleName)
            setFontName(fontname)
            dispatch(designAction({ coverstyle: styleName }))
        })
    }

    const selectBackgroundStyle = (backgroundstyle: any) => {
        // setBackgroundName(backgroundname)
        setBackgroundStyle(backgroundstyle)
        updateData({ theme: backgroundstyle?.id }).then(() => {
            dispatch(designAction({ theme: backgroundstyle }))
        })
    }

    const setGridStyle = (styleName: any) => {
        setGrid(styleName)
        updateData({ gridStyle: styleName }).then(() => {
            dispatch(designAction({ gridStyle: styleName }))
        })

    }

    const setGridSpace = (styleName: any) => {
        setSpace(styleName)
        updateData({ gridSpacing: styleName }).then(() => {
            dispatch(designAction({ gridSpacing: styleName }))
        })
    }

    const updateData = async (values: any) => {
        try {
            if (collectionId) {
                const updateRes = await CollectionService.updateDesign(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    NotificationWithIcon("success", "Setting saved.")
                    return updateRes?.result?.name
                }
            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
            } else {
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        setSideScreenStyle()
    }, [])

    async function setSideScreenStyle() {
        try {
            if (collectionId) {
                const resData = await CollectionService.getDesign(collectionId)
                if (resData && resData?.code === STATUS_CODE.SUCCESS) {
                    setBackgroundStyle(resData?.result?.theme || light)
                    setGrid(resData?.result?.gridStyle || "column")
                    setSpace(resData?.result?.gridSpacing || "regular")
                    setFontStyle(font[resData?.result?.typography] || font["Sans"])
                    setFontName(resData.result.typography || "Sans")
                    // dispatch(designAction({ coverstyle: font[resData?.result?.typography] }))
                    // dispatch(designAction({ gridStyle: resData.result.gridStyle || "column" }))
                    // dispatch(designAction({ gridSpacing: resData.result.gridSpacing || "regular" }))
                    // dispatch(designAction({ theme: resData?.result?.theme }))
                    dispatch(setAllDesign({
                        coverstyle: font[resData?.result?.typography],
                        gridStyle: resData.result.gridStyle || "column",
                        gridSpacing: resData.result.gridSpacing || "regular",
                        theme: resData?.result?.theme || font["Sans"]
                    }))
                }
            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
            } else {
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    return (
        <>
            <div className={styles.maincomponent}>
                <Form>
                    <Form.Label className={styles.sidemaintitle}>Design Settings</Form.Label>
                    <Row>
                        <Col lg={4} md={4} sm={4} className={styles.selection}>
                            <div className={styles.fontmain}>
                                <Form.Label className={styles.formlabel}>Typography</Form.Label>
                                <div className={styles.titlediv}>
                                    <Form.Label
                                        className={styles.covertitle}
                                        style={fontStyle}
                                    >
                                        Cover Title
                                    </Form.Label>
                                    <Form.Label
                                        className={styles.coverdate}
                                        style={fontStyle}
                                    >
                                        January 6th, 2023
                                    </Form.Label>
                                    <Dropdown className={styles.dropdownselect} >
                                        <Dropdown.Toggle variant="none" style={{ width: "100%" }} size="lg" id="dropdown-basic" >
                                            <div className={styles.customDropdown}>
                                                <span className={styles.dropdownname}>{fontName}</span>
                                                <i className="fa-sharp fa-regular fa-angle-down"></i>
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu style={{ width: "100%" }}>
                                            <Dropdown.Item onClick={() => selectFontStyle("Sans", font["Sans"])}>
                                                <div className={styles.fontstylemain}>
                                                    <div className={styles.fontsvg}>
                                                        <Image src={"../../../sans.svg"} />
                                                    </div>
                                                    <div>Sans</div>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectFontStyle("Serif", font["Serif"])}>
                                                <div className={styles.fontstylemain}>
                                                    <div className={styles.fontsvg}>
                                                        <Image src="../../../sans.svg" />
                                                    </div>
                                                    <div>Serif</div>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectFontStyle("Modern", font["Modern"])}>
                                                <div className={styles.fontstylemain}>
                                                    <div className={styles.fontsvg}>
                                                        <Image src="../../../sans.svg" />
                                                    </div>
                                                    <div>Modern</div>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectFontStyle("Timeless", font["Timeless"])}>
                                                <div className={styles.fontstylemain}>
                                                    <div className={styles.fontsvg}>
                                                        <Image src="../../../sans.svg" />
                                                    </div>
                                                    <div>Timeless</div>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectFontStyle("Bold", font["Bold"])}>
                                                <div className={styles.fontstylemain}>
                                                    <div className={styles.fontsvg}>
                                                        <Image src="../../../sans.svg" />
                                                    </div>
                                                    <div>Bold</div>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectFontStyle("Subtle", font["Subtle"])}>
                                                <div className={styles.fontstylemain}>
                                                    <div className={styles.fontsvg}>
                                                        <Image src="../../../sans.svg" />
                                                    </div>
                                                    <div>Subtle</div>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className={styles.fontmain}>
                                <Form.Label className={styles.formlabel}>Color</Form.Label>
                                <div className={styles.titlediv}>
                                    <div className={styles.colorblock}>
                                        <div className={styles.colorstyle}>
                                            <svg height="40" width="40">
                                                <circle cx="20" cy="20" r="15" stroke="#D9D9D9" strokeWidth={1} fill={backgroundStyle?.background} />
                                            </svg>
                                            <p className={styles.styletype}>Background</p>
                                        </div>
                                        <div className={styles.colorstyle}>
                                            <svg height="40" width="40">
                                                <circle cx="20" cy="20" r="15" stroke="#D9D9D9" strokeWidth={1} fill={backgroundStyle?.accent} />
                                            </svg>
                                            <p className={styles.styletype}>Accent</p>
                                        </div>
                                        <div className={styles.colorstyle}>
                                            <svg height="40" width="40">
                                                <circle cx="20" cy="20" r="15" stroke="#D9D9D9" strokeWidth={1} fill={backgroundStyle?.button} />
                                            </svg>
                                            <p className={styles.styletype}>Button</p>
                                        </div>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="none" style={{ width: "100%" }} size="lg" id="dropdown-basic">
                                            <div className={styles.customDropdown}>
                                                <span className={styles.dropdownname}>{backgroundStyle?.name}</span>
                                                <i className="fa-sharp fa-regular fa-angle-down"></i>
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu style={{ width: "100%" }}>
                                            <Dropdown.Item className={styles.colordropmain} onClick={() => selectBackgroundStyle(light)}>
                                                <CustomDropdownItem color1="#FFFFFF" color2="#F5F5F5" color3="#333333" theme="Light" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(gold)} className={styles.colordropmain}>
                                                <CustomDropdownItem color1="#FFFEFA" color2="#FCF8F2" color3="#9E8962" theme="Gold" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(rose)} className={styles.colordropmain}>
                                                <CustomDropdownItem color1="#FBF8F7" color2="#F8F3F2" color3="#9E7977" theme="Rose" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(terracotta)} className={styles.colordropmain}>
                                                <CustomDropdownItem color1="#FBF7F4" color2="#F3ECE7" color3="#9E765D" theme="Terracotta" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(sand)} className={styles.colordropmain}>
                                                <CustomDropdownItem color1="#F5F2F0" color2="#E9E4E2" color3="#9E8B7D" theme="Sand" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(olive)} className={styles.colordropmain}>
                                                <CustomDropdownItem color1="#F6F6F3" color2="#EDECE8" color3="#9D9E7E" theme="Olive" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(agave)} className={styles.colordropmain}>
                                                <CustomDropdownItem color1="#F5F6F5" color2="#EDF0ED" color3="#869E94" theme="Agave" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(sea)} className={styles.colordropmain}>
                                                <CustomDropdownItem color1="#FAFAFA" color2="#EAECEE" color3="#93939F" theme="Sea" />
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => selectBackgroundStyle(dark)} className={styles.colordropmain}   >
                                                <CustomDropdownItem color1="#1E1E1E" color2="#282828" color3="#4D4D4D" theme="Dark" />
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className={styles.fontmain}>
                                <Form.Label className={styles.formlabel}>Grid Style</Form.Label>
                                <div className={styles.gridstylediv}>
                                    <div
                                        className={styles.gridstyleinnerdiv}
                                        onClick={() => setGridStyle("column")}
                                    >
                                        <div className={styles.gridinnersetting} style={grid === "column" ? activeStyle : {}}>
                                            <i className="fa-sharp fa-solid fa-objects-column gridicon"></i>
                                        </div>
                                        <p className={styles.stylenames}>Vertical</p>
                                    </div>
                                    <div
                                        className={styles.gridstyleinnerdiv}
                                        onClick={() => setGridStyle("row")}
                                    >
                                        <div className={styles.gridinnersetting} style={grid === "row" ? activeStyle : {}}>
                                            <i className="fa-sharp fa-solid fa-objects-column fa-rotate-270 gridicon"></i>
                                        </div>
                                        <p className={styles.stylenames}>Horizontal</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.fontmain}>
                                <Form.Label className={styles.formlabel}>Grid Spacing</Form.Label>
                                <div className={styles.gridstylediv}>
                                    <div className={styles.gridstyleinnerdiv}
                                        onClick={() => setGridSpace("regular")}
                                    >
                                        <div className={styles.gridinnersetting} style={space === "regular" ? activeStyle : {}}>
                                            <i className="fa-sharp fa-solid fa-grid-2 gridicon"></i>
                                        </div>
                                        <p className={styles.stylenames}>Regular</p>
                                    </div>
                                    <div className={styles.gridstyleinnerdiv}>
                                        <div className={styles.gridinnersetting}
                                            onClick={() => setGridSpace("large")}
                                            style={space === "large" ? activeStyle : {}}
                                        >
                                            <i className="fa-sharp fa-solid fa-objects-column fa-rotate-270 gridicon"></i>
                                        </div>
                                        <p className={styles.stylenames}>Large</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <DesignSideScreen />
                    </Row>

                </Form>
            </div >
        </>
    );
};

export default Design;
