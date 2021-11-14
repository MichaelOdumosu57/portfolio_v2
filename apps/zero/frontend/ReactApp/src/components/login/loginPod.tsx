import React, {useState,useEffect,MouseEventHandler} from 'react';
import '../../App.scss';
import {mediaPrefix,classPrefix} from '../../customExports'
import {Pane} from 'evergreen-ui'

let meta = {
    name:"Login"
}
let prefix ={
    view: classPrefix({view:`${meta.name}View`}),
    main:classPrefix( {view:`${meta.name}Main`}),
    pods:Array(1).fill(null)
    .map((x:any,i)=>{
        return classPrefix({view:`${meta.name}Pod`+i})
    })
}

interface Props  {
    history:any
}

export default function LoginPod(props:Props) {

    let login = {
        user:{
            label:{
                text:'Username'
            }
        },
        pass:{
            label:{
                text:'Password'
            }
        },
        submit:{
            text:"Submit",
            onClick:(e: React.MouseEvent)=>{
                props.history.push('/upload')
            }
        }
    }


    return <div className={prefix.view({val:''})}>
        <div className={prefix.pods[0]({val:''})}>
            <div className={prefix.pods[0]({val:'Item0'})}>
                <div className={prefix.pods[0]({val:'Item1'})} >
                    <label>{login.user.label.text}</label>
                    <input className={prefix.pods[0]({val:'Input'})}/>
                </div>
                <div className={prefix.pods[0]({val:'Item1'})} >
                    <label>{login.pass.label.text}</label>
                    <input  className={prefix.pods[0]({val:'Input'})}/>
                </div>  
                <button 
                onClick={login.submit.onClick}
                className={prefix.pods[0]({val:'Button'})}>
                    {login.submit.text}
                </button>              
            </div>
        </div>
    </div>
}