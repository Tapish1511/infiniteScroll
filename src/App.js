import React, { useEffect, useRef, useState, lazy, Suspense, useCallback } from "react";
import styles from './css/main.module.css';
import HeaderEl from "./components/HeaderEl";
import DateLine from "./components/dateLine";

import {GrAttachment as Attachment} from 'react-icons/gr';
import {AiOutlineSend as Send, AiOutlineCamera as Camera} from 'react-icons/ai';
import {BsCameraVideo as VideoCamera} from 'react-icons/bs';
import {TbNotes as Files} from 'react-icons/tb'
import useFetchData from "./hooks/fetchChat";



const Chat = lazy(()=> import('./components/chat'));


function App() {

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const bottomRef = useRef(null);

  const imgRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const attachRef = useRef(null);

  const [showInput, setShowInput] = useState(false);
  const [containerHeight, setContainerHeight] = useState('');
  const [pageNumber, setPageNumber] = useState(0);


  const observer = useRef();
  const {isLoading, hasMore ,chats, sender, receiver, title, imgs} = useFetchData(pageNumber);

  const lastChat = useCallback(ele=>{
    if(isLoading) return;
    if(observer.current) {
      observer.current.disconnect();
      
    }
    observer.current = new IntersectionObserver(entries=>{
      
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prev=> prev+1);
        
      };
    });

    if(ele) observer.current.observe(ele);
  }, [isLoading, hasMore]);

  useEffect(()=>{
   setContainerHeight(`calc(100vh - ${headerRef.current.scrollHeight}px - ${bottomRef.current.scrollHeight}px - 40px)`);
  //  containerRef.current.scrollBy(0, containerRef.current.scrollHeight); 
   
   document.addEventListener('click', (e)=>{
      if(!attachRef.current.contains(e.target)) setShowInput(false);
   })

    
  },[])



  function inputHandle(){
    setShowInput(!showInput);
  }

  function inputClick(ref){
    ref.current.click();
  }

  return(
    <>
      <div className={styles.container} >

        <Suspense fallback={<HeaderEl imgs={[]}></HeaderEl>}>
          <HeaderEl Ref={headerRef} sender={sender} receiver={receiver} title={title} imgs={imgs}/>
        </Suspense>
        

        <div className={styles.scrollContent} ref={containerRef} style={{height: containerHeight}}>
          
          <Suspense fallback={
            <>
              <p>fetching...</p>
            </>

          }>

            {chats.map((chat, index)=>{
               let date = new Date(chat.time.split(' ')[0]);
               date = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
              
              if(index < chats.length-1){
                
                if(chat.time.split(' ')[0] !== chats[index+1].time.split(' ')[0]){
                 
                  return(<div key={chat.id}>
                    <DateLine date={date}/>
                    <Suspense fallback='loading...' >
                      <Chat self={chat.sender.self} msg={chat.message} image={chat.sender.image} isVarified={chat.sender.is_kyc_verified}/>
                    </Suspense>

                  </div>)
                }
              }
              
              else if(index === chats.length-1){
                
                return (<div key={chat.id} ref={lastChat}>
                    <DateLine date={date}/>
                    <Suspense fallback='loading...' >
                      <Chat self={chat.sender.self} msg={chat.message} image={chat.sender.image} isVarified={chat.sender.is_kyc_verified}/>
                    </Suspense>

                  </div>)
                  }

              return (
                <div key={chat.id}>
                  <Suspense fallback={<div>loading...</div>}>
                    <Chat self={chat.sender.self} msg={chat.message} image={chat.sender.image} isVarified={chat.sender.is_kyc_verified}/>
                  </Suspense>
                </div>
              )
              
              
              
            })}
          
          </Suspense>

          {isLoading && 
          <>
            <Chat self={false} msg='loading...'/>
            <Chat self={false} msg='loading...'/>
            <Chat self={false} msg='loading...'/>
          </>
          }
          
        </div>
        

        <div className={styles.bottomContent} ref={bottomRef}>
          <form action="" className={styles.formStyle}>
            <textarea name="" id="" cols="1" rows="1" placeholder="Reply to @Rohit Yadav"></textarea>
            <div className={styles.fileInputs} ref={attachRef} onClick={()=>{inputHandle()}}>
              <Attachment />
              
              {showInput && 
              <div className={styles.attachments}>
                <input type="file" name="" id="" accept="image/*" hidden ref={imgRef}/>
                <input type="file" name="" id="" accept="video/mp4,video/x-m4v,video/*" hidden ref={videoRef}/>
                <input type="file" name="" id="" hidden ref={fileRef}/>
                <Camera className={styles.customIcon} onClick={()=>{inputClick(imgRef)}}/>
                <VideoCamera className={styles.customIcon} onClick={()=>{inputClick(videoRef)}}/>
                <Files className={styles.customIcon} onClick={()=>{inputClick(fileRef)}}/>
              </div>
              }
              
            </div>
           
            <div type="submit"><Send/></div>
          </form>
          
        </div>

      </div>
    </>
  );
}

export default App;
