import React from 'react'
import styles from './Categories.module.css'
import CategorySvgLine from './CategorySvgLine'
import { ArrowRight } from 'lucide-react'


function Category(prop) {
  return (
    <div className={styles.CategoryBox}>
        <div className={styles.CategoryBoxImgWrap}>
                            <img src={prop.image}></img>
                             <CategorySvgLine className={styles.categoryImgDivider}></CategorySvgLine>
        </div>

        <div className={styles.categoryBoxContent}>
                    <div className={styles.categoryBoxContentText}>
                        
                        <div className={styles.categoryBoxContentTextFirst}>
                            <h3>{prop.name}</h3>
                            <p>{prop.desc}</p>

                        </div>
                                
                        <div className={styles.CategoryBoxArrow}>
                            <ArrowRight stroke='var(--color-surface)'></ArrowRight>
                        </div>

                    </div>

        </div>
                       
    </div>
  )
}

export default Category