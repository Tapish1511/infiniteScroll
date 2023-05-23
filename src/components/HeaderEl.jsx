import React from "react";
import styles from '../css/head.module.css'
import {FiEdit as Edit, FiArrowLeft} from 'react-icons/fi'
import {BiDotsVerticalRounded as Dots} from 'react-icons/bi'

function HeaderEl({Ref, sender, receiver, title, imgs}){
    return(
        <>
            <header className={styles.headContent} ref={Ref}>
            <h2 className={styles.titleContainer}>

                <FiArrowLeft/>
                <div className={styles.title}>{title}</div>
                <Edit />
            </h2>

            <div className={styles.details}>
                <div className={styles.imgs}>
                    {imgs.map((image, index)=>{
                        return <img src={image} alt="" key={index}/>
                    })}
                </div>
                <div className={styles.detailsEl}>
                    <div className={styles.From}>From <strong>{sender}</strong></div>
                    <div className={styles.To}>To <strong>{receiver}</strong></div>
                </div>

                <Dots className={styles.dots}/>

            </div>
            </header>
        </>
    );
}

export default HeaderEl;