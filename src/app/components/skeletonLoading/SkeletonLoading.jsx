import React from 'react'
import { Skeleton } from '@mui/material'

const SkeletonLoading = () => {
    return (
        <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
            style={{ backgroundColor: "#E1E3E6" }}
        />
    )
}

export default SkeletonLoading