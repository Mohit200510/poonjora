import React from 'react'
import styles from "./ProductSkeleton.module.css";
import Skeleton from 'react-loading-skeleton'
import { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
import Container from '../../../components/common/Container';

function ProductSkeleton() {
  return (
    <div className={styles.productSkelton}>
      <Container>
         <SkeletonTheme baseColor="#EAE3DE"  highlightColor="#F8F4F0" borderRadius={10}>

       <div className={styles.skeltonContainer}>


        <div className={styles.productImageSkeletonContainer}>
          <Skeleton  className={styles.imagePlaceholder}  />
        </div>

        <div className={styles.productTextSkeleton}>
          <Skeleton containerClassName={styles.productTittleSkeleton}  height={75} />
          <Skeleton containerClassName={styles.productTitleBottomSkeleton} height={38}/>
          <Skeleton height={70}/>
          <div className={styles.productSkeltonBtns}>
          <Skeleton containerClassName={styles.productButtonSkeleton} height={75}/>
          <Skeleton containerClassName={styles.productButtonSkeleton} height={75}/>
          </div>
        </div>


       </div>
        </SkeletonTheme>
        </Container>

    </div>
  )
}

export default ProductSkeleton