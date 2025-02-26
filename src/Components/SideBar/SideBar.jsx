import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context';
function SideBar() {
    const {onSent,prevPropmt,setRecentPropmt,setInput,newChat}=useContext(Context);
    const [extended,setExtended]=useState(false);
    const loadPropt=async (propt)=>{
        setRecentPropmt(propt)
     var res=  await onSent(propt);
    }
    const clearAll=()=>{
        
        newChat();
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img className='menu' src={assets.menu_icon} alt="" onClick={()=>setExtended((pre)=>!pre)}/>
            <div className="new-chat" onClick={()=>clearAll()}>
                <img src={assets.plus_icon} alt="" />
               {extended? <p >New Chat</p>:null}
            </div>
            {extended?
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPropmt.map((item,index)=>{
                        return (
                            <div className="recent-entry" onClick={()=>loadPropt(item)}>
                                <img src={assets.message_icon} alt="" />
                                <p >{item.slice(0,18)} ...</p>
                            </div>
                        )
                    })}
                    
                </div>
            :null}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
               {extended?<p>Help</p> :null} 
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
               {extended? <p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}

export default SideBar