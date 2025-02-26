import { createContext, useReducer, useState } from "react";
import runChat from "../Config/gemini";

export const Context=createContext();
const ContextProvider=(props)=>{
    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPropmt]=useState("");
    const [prevPropmt,setPrevPropmt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");
    const delayPara=(index,nextWord)=>{
        setTimeout(()=>{
            setResultData(pre=>pre+nextWord)
        },index*75)
    }   
    const newChat=()=>{
        setLoading(false);
        setShowResult(false)
        // setPrevPropmt([])
    }

        const onSent=async (propt)=>{ 
            debugger
            setResultData("");
            setLoading(true);
            setShowResult(true);
            var res;
            if(propt!==undefined){
                res=  await runChat(propt);
                setRecentPropmt(propt);
            }else{
                setRecentPropmt(input);
                setPrevPropmt((prev)=>[...prev,input])
                res=  await runChat(input);
            }
            
            let responseArray=res.split("**");
            var newResponse = ""; // Initialize the variable
            for (var i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>"; // Fixed closing tag
                }
            }
            let newResponse2=newResponse.split("*").join("</br>");
            let newRespArray=newResponse2.split(" ");
            for(let i=0;i<newRespArray.length;i++){
                const nex_word=newRespArray[i];
                delayPara(i,nex_word+" ");
            }
            // setResultData(newResponse2);
            setLoading(false);
            setInput("")
        }

        const contextValue={
            prevPropmt,setPrevPropmt,onSent,setRecentPropmt,recentPrompt,showResult,
            loading,resultData,input,setInput ,newChat
        }
        return (
                <Context.Provider value={contextValue}>
                    {props.children}
                </Context.Provider>
        )
}
export default ContextProvider ;