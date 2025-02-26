import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'
function Main() {
  const {onSent,recentPrompt,showResult,loading , resultData, setInput,input,setPrevPropmt}=useContext(Context);
  const sugClicked=async (event)=>{
    var value;
    if(event.target.tagName!='P'){
      value= event.target.querySelector('p').innerHTML
    }else{
      value=event.target.innerHTML;
    }
    setPrevPropmt((prev)=>[...prev,value])
     var res=  await onSent(value);
  }
  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt=""  className='image'/>
        </div>
        <div className="main-container">
          {!showResult ? <>
            <div className="greet">
            <p><span>Hell0, Dev.</span></p>
            <p>How Can I help you today</p>
          </div>
          <div className="cards" >
            <div className="card" onClick={(e)=>sugClicked(e)}>
              <p>suggest beautiful places to see on upcoming road trip </p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card" onClick={(e)=>sugClicked(e)}>
              <p>summarize the concept of : urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card" onClick={(e)=>sugClicked(e)}>
              <p>Brainstrom team</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card" onClick={(e)=>sugClicked(e)}>
              <p>Improve Reusability for the following code</p>
                  <img src={assets.code_icon} alt="" />
            </div>
          </div>
          </>:

        <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-date">
            <img src={assets.gemini_icon} alt="" />
            {loading ?<div className='loader'>
              <hr />
              <hr />
              <hr />
            </div>:
             <p dangerouslySetInnerHTML={{__html:resultData }}></p>
            }
           
          </div>
        </div>
        }
         
          <div className="main-bottom">
            <div className="search-box">
              <input type="text" placeholder='Enter a promt here' onChange={(e)=>setInput(e.target.value)} value={input}/>
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img className={input.length==0 ?"addOpacity":""} src={assets.send_icon} alt="" onClick={()=>onSent()}/>
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info,  including about people , so double-check its responses . Your privacy and Gemini Apps 
            </p>
          </div>
        </div>
    </div>
  )
}

export default Main