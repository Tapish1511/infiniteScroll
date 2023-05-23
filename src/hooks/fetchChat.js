import {useState, useEffect} from "react";
import axios from "axios";

function useFetchData(pageNumber){

    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [chats, setChats] = useState([]);
    // let tempChats = [];
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [title, setTitle] = useState('');
    const [imgs, setImgs] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    

    useEffect(()=>{
        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}`,
            params: {page: 0}
        }).then(res=>{
            setSender(res.data.from);
            setReceiver(res.data.to);
            setTitle(res.data.name);
            setHasMore(res.data.chats.length > 0);

            setImgs(prev=>{
                let newImgs = [...new Set(res.data.chats.map((chat)=>{
                    return chat.sender.image;
                }))];
                
                newImgs = newImgs.slice(0, 4);
                
                return newImgs;
            })
            
            
            // setChats(prev=> {
            //     let newChats = res.data.chats.map(chat=>chat);
            //     newChats = newChats.sort((a, b)=>{
            //         return new Date(b.time).getTime() - new Date(a.time).getTime()
            //     })
            //     return [...prev, ...newChats];
            // });
                        
            // console.log(res.data);
            setLoading(false);
            
        }).catch(e=>{
            setError(true);
            console.error(e);
        })

    }, [])

    useEffect(()=>{

        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}`,
            params: {page: pageNumber}
        }).then(res=>{

            setHasMore(res.data.chats.length > 0);   
            
            setChats(prev=> {
                let newChats = res.data.chats.map(chat=>chat);
                newChats = newChats.sort((a, b)=>{
                    return new Date(b.time).getTime() - new Date(a.time).getTime()
                })
                return [...prev, ...newChats];
            });
                        
            setLoading(false);
            
        }).catch(e=>{
            setError(true);
            console.error(e);
        })



    }, [pageNumber])

    

    


    return {isLoading, isError, chats, hasMore, sender, receiver, title, imgs}

}

export default useFetchData;
