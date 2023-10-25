import React, {useState,useEffect} from 'react';
import '../../App.scss';
import {mediaPrefix,classPrefix,NftsItems,ipfs_conversion} from '../../customExports'
import {Pane} from 'evergreen-ui'
import QRCode from "react-qr-code";
import { io } from 'socket.io-client';





let meta = {
    name:"NFTS"
}
let prefix ={
    view: classPrefix({view:`${meta.name}View`}),
    main:classPrefix( {view:`${meta.name}Main`}),
    pods:Array(1).fill(null)
    .map((x:any,i)=>{
        return classPrefix({view:`${meta.name}Pod`+i})
    })
}

interface Props {
    env:any,
    nftsItems:NftsItems[],
    setNftsItems:Function
}

export default function NFTSPod(props:Props){



    let nfts = {
        items:props.nftsItems,
        conversion:ipfs_conversion,
        clientIo : io(props.env.backend.url)
    }



    return <div className={prefix.view({val:''})}>
        <div className={prefix.main({val:'Pod'})}>
            <div className={prefix.pods[0]({val:''})}>
                <h1 className={prefix.pods[0]({val:'Title0'})}>Your NFT's</h1>
                <div className={prefix.pods[0]({val:'Item0'})}>
                {
                    nfts.items.map((x,i)=>{
                        return <div key={i} className={prefix.pods[0]({val:'Item1'})}>
                            <h2>{x.title.text}</h2>
                            
                            <div style ={{border:"10px solid white"}}>
                                <QRCode  size={128} value={x.qrcode.text}/>
                            </div>
                        </div>
                    })
                }
                </div>
            </div>
        </div>
    </div>
}