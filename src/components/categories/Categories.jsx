import React from 'react'
import Container from '../common/Container'
import styles from "./Categories.module.css"
import catg1 from "../../assets/categoryOne.webp"
import catg2 from "../../assets/categoryTwo.webp"
import catg3 from "../../assets/categoryThree.webp"
import catg4 from "../../assets/categoryFour.webp"
import catg5 from "../../assets/categoryFive.webp"
import catg6 from "../../assets/categorySix.webp"
import Category from './Category'
import temple from "../../assets/temple3.webp"
import { ArrowRight } from 'lucide-react'


function Categories() {
  return (
    <section className={styles.sectionCategories}>
        <Container>
            
            <div className={styles.secCategoriesHeader}>
                <h2>Shop by Category</h2>
                <p>Handpicked collections for every ritual, celebration, and sacred space.</p>
            </div>
        </Container>

        

            <div className={styles.secCategoriesContent}>
                <Container>
                    {/* <div className={styles.CategoryBoxes}>
                        <Category image={catg1} name="Pooja Kits" desc="Everything you need for complete rituals" ></Category>
                        <Category image={catg2} name="Idols"   desc="Divine idols to bring blessings home"></Category>
                        <Category image={catg3} name="Incense" desc="Pure frangrances for Home"></Category>
                        <Category image={catg4} name="Diyas" desc="light up your prayers with divine glow"></Category>
                        <Category image={catg5} name="Rudraksha" desc="Sacred beads for protection and spirutality"></Category>
                        <Category image={catg6} name="Decor" desc="Enhance your sacred space with divine glow"></Category>
                        
                    </div> */}
                    <div className={styles.temple}>
                <img src={temple}></img>
            </div>

                    <div className={styles.CategoriesSeeMore}>
                       <button>View All Categories <ArrowRight /></button>
                    </div>
                
                
                
                

                </Container>


            </div>

            

            



            

        
    </section>
  )
}

export default Categories