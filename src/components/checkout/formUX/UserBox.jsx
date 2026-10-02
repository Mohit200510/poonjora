import React from 'react'

import styles from "./FormUX.module.css"

function UserBox() {
  return (
    <div className={styles.userBox}>
      <div className={styles.userBoxMain}>
        <div className={styles.userBoxLeft}>
          <span>R</span>
          <div>
            <h4>Radha</h4>
            <h5>radhakrishna@gmail.com</h5>
            
          </div>

        </div>
        <div className={styles.userBoxRight}>
          Logout

        </div>

      </div>
    </div>
  )
}

export default UserBox