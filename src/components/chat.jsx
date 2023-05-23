import React from "react";
import styles from '../css/chat.module.css'

function Chat({self, msg, image, isVarified}){

    if(self){
        return(
            <>
                <div className={styles.chatSelf}>
                    <p dangerouslySetInnerHTML={{__html: msg}}>                        
                       
                    </p>
                </div>
            
            </>
        );
    }

    return(
        <>
            <div className={styles.chatOther}>
                <div>
                    <img src={image} alt="" />
                    {isVarified && <div className={styles.varified}></div>}
                </div>
                <p dangerouslySetInnerHTML={{__html: msg}}>
                    
                </p>
            </div>

        </>
    );

}

export default Chat;