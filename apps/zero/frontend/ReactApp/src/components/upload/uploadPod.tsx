import React, {useState,useEffect,MouseEventHandler} from 'react';
import '../../App.scss';
import {mediaPrefix,classPrefix} from '../../customExports'
import {Pane} from 'evergreen-ui'
import QRCode from "react-qr-code";

let meta = {
    name:"Upload"
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
    // history:any
    env:any
}


export default function UploadPod(props:Props){
    let [qrCode,setQrCode] = useState('');
    
    
    let upload = {
        file:{
            element:document.createElement('input') ,
            onChange:()=>{

                
                fetch(`${props.env.backend.url}/ipfs_upload/${props.env.creds.user}`,{method:"POST",body:upload.file.element.files?.[0]})
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    upload.file.element.setAttribute('type','text')
                    upload.file.element.setAttribute('type','file')
                    setQrCode(res.message.object_url)
                })
                .catch(err=>{
                    console.log(err)
                    upload.file.element.setAttribute('type','text')
                    upload.file.element.setAttribute('type','file')                    
                })
            }
        },
        button:{
            onClick:()=>{
                upload.file.element.click()
            },
            text:"Upload Content"
        },
        qrcode:{
            value:qrCode
        }
    }

    // modifying file
    upload.file.element.type = 'file';
    upload.file.element.onchange = upload.file.onChange;
    // 

    return (
        <div className={prefix.view({val:''})}>
            <div className={prefix.main({val:'Pod'})}>
                <div className={prefix.pods[0]({val:''})}>
                    <div 
                    className={prefix.pods[0]({val:'Item'})}
                    style={{flex:"1 0 100%"}}>
                        <button 
                        onClick={upload.button.onClick}
                        className={prefix.pods[0]({val:'Button'})}
                        >{upload.button.text}</button>
                    </div>
                    <div style ={{border:"10px solid white"}}>
                        <QRCode value={upload.qrcode.value}/>
                    </div>
                </div>
            </div>
        </div>
    )
}