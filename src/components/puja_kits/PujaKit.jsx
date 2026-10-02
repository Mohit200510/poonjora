import React from 'react'
import styles from "./PujaKit.module.css"
import Container from '../common/Container';
import { useRef } from 'react';
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { SiHackthebox } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";




import satyanarayanBg from "../../assets/puja_kit1.png";
import shivBg from "../../assets/shivBg.webp";
import hanumanBg from "../../assets/hanumanji.webp";
import lakshmiBg from "../../assets/laxmiMata.webp";
import grihaPraveshBg from "../../assets/pravesh.webp";
import navgrahBg from "../../assets/navgrah.webp";



function PujaKit() {


    const kitsRef = useRef(null)

  

const pujaKits = [
  {
    id: 1,
    name: "Satyanarayan Puja Kit",
    category: "For Katha & Pujan",
    description: "Complete samagri for Satyanarayan Katha",
    essentials: 25,
    price: 499,
    mrp: 699,
    discount: 29,
    image: satyanarayanBg,
  },
  {
    id: 2,
    name: "Shiv Shankar Puja Kit",
    category: "For Abhishek",
    description: "Complete samagri for Shiv Abhishek & Puja",
    essentials: 21,
    price: 449,
    mrp: 599,
    discount: 25,
    image: shivBg,
  },
  {
    id: 3,
    name: "Hanuman Puja Kit",
    category: "For Bhakti",
    description: "Complete samagri for Hanuman Puja",
    essentials: 18,
    price: 399,
    mrp: 549,
    discount: 27,
    image: hanumanBg,
  },
  {
    id: 4,
    name: "Lakshmi Puja Kit",
    category: "For Wealth & Prosperity",
    description: "Complete samagri for Lakshmi Puja",
    essentials: 20,
    price: 449,
    mrp: 599,
    discount: 25,
    image: lakshmiBg,
  },
  {
    id: 5,
    name: "Griha Pravesh Puja Kit",
    category: "For New Beginnings",
    description: "Complete samagri for Griha Pravesh Puja",
    essentials: 28,
    price: 599,
    mrp: 799,
    discount: 25,
    image: grihaPraveshBg,
  },
  {
    id: 6,
    name: "Navgrah Puja Kit",
    category: "For Special Occasions",
    description: "Complete samagri for Navgrah Shanti",
    essentials: 27,
    price: 699,
    mrp: 899,
    discount: 22,
    image: navgrahBg,
  },
];


        function scrollRight(){
            kitsRef.current.scrollBy({
                 left: kitsRef.current.clientWidth,
                behavior: "smooth",
                
            });
            
        }

        function scrollLeft(){
            kitsRef.current.scrollBy({
                 left: -kitsRef.current.clientWidth,
                behavior: "smooth",
                
            });
            
        }



  return (
    <section className={styles.secPujaKit}>
        <Container>
            <div className={styles.secPujaKitHeader}>
                <h2>Kits for Every Sacred Occasion</h2>
                <p>Complete puja samagri, thoughtfully curated for your spiritual needs</p>
            </div>

            <div className={styles.pujaKitBody}>

                <button onClick={scrollLeft}  className={`${styles.PujaKitBoxScrolBtn1} ${styles.PujaKitBoxScrolBtns}`} type='button'><FaAngleLeft/></button>


                <div className={styles.pujaKitBoxes} ref={kitsRef}>


                    {pujaKits.map((kit)=>(
                        <div className={styles.PujaKitBox}>
                        <img src={kit.image}></img>
                        
                        <div className={styles.PujaKitBoxInner}>
                            <div className={styles.PujaKitBoxTopTag}>
                                  <PiBookOpenTextDuotone/>
                                 <p>{kit.category}</p>
                            </div>
                            <div className={styles.pujakitBoxHeading}>
                                <h2>{kit.name}</h2>
                                <p>{kit.description}</p>
                            </div>

                            <div className={styles.PujaKitBoxSize}>

                                <SiHackthebox/>
                                <span> {kit.essentials}+ Essentials</span>
                            </div>

                            <div className={styles.PujaKitBoxPrice}>
                                <h3>₹{kit.price}</h3>
                                <h4><del>₹{kit.mrp}</del></h4>
                                <span> {kit.discount}% OFF</span>
                            </div>
                            <div className={styles.PujaKitBoxbtn}>
                                <FiArrowRight/>

                            </div>
                        </div>
                    </div>

                    ))}

                </div>
                <button onClick={scrollRight} className={`${styles.PujaKitBoxScrolBtn2} ${styles.PujaKitBoxScrolBtns}`} type='button'><FaAngleRight/></button>




            </div>
        </Container>
    </section>
  )
}

export default PujaKit