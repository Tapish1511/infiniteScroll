import React from "react";
import styles from '../css/chat.module.css'

function DateLine({date}){

    return(
        <>

            <div className={styles.dateLine}>
                <div></div>
                <div>{date}</div>
                <div></div>
          </div>    
        
        </>
    );
}

export default DateLine;