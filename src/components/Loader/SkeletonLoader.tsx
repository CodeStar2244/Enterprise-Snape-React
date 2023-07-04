import { Skeleton } from 'antd'
import React from 'react'

const SkeletonLoader = () => {
  return (
    <>
    <Skeleton   avatar  paragraph={{ rows: 2 }} active/>
    <Skeleton   avatar  paragraph={{ rows: 2 }} active/>
    </>
  )
}

export default SkeletonLoader