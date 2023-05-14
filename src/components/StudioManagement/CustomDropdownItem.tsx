import React from 'react'
import styles from "./Design.module.css"


declare interface Props {
  theme: string
  color1: string
  color2: string
  color3: string
}
const CustomDropdownItem = ({ theme, color1, color2, color3 }: Props) => {
  return (
    <div className={styles.dropdownItemMainComp}>
      <div className={styles.colorBallsParentDiv}>
        <svg height="40" width="40">
          <circle cx="20" cy="20" r="15" stroke="#D9D9D9" strokeWidth={1} fill={color1} />
        </svg>
        <svg height="40" width="40">
          <circle cx="20" cy="20" r="15" stroke="#D9D9D9" strokeWidth={1} fill={color2} />
        </svg>
        <svg height="40" width="40">
          <circle cx="20" cy="20" r="15" stroke="#D9D9D9" strokeWidth={1} fill={color3} />
        </svg>
      </div>
      <span className={styles.themename}>{theme}</span>
    </div>
  )
}

export default CustomDropdownItem;