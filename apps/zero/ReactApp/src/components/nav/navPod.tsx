import React, {useState,useEffect} from 'react';
import '../../App.scss';
import {mediaPrefix,classPrefix} from '../../customExports'
import {Pane} from 'evergreen-ui'


let meta = {
    name:"Nav"
}
let prefix ={
    view: classPrefix({view:`${meta.name}View`}),
    main:classPrefix( {view:`${meta.name}MainPod`}),
    pods:Array(1).fill(null)
    .map((x:any,i)=>{
        return classPrefix({view:`${meta.name}Pod`+i})
    })
}

interface Props {
    history:any
}

export default function NavPod(props:Props){

    let [menuMobileStyle,setMenuMobileStyle] = useState({})

    let nav = {
        name:{
            text:'Feroz'
        },
        menu:{
            mobile:{
                style:menuMobileStyle
            },
            icon:{
                onClick:()=>{
                    setMenuMobileStyle({display:'flex'})
                }
            }
        },
        links:{
            items:["Login","Upload","Your NFT's"]
            .map((x,i)=>{
                return{
                    text:x,
                    onClick:()=>{
                        props.history.push(["/","/upload","/nfts"][i])
                    },
                    mobile:{
                        onClick:()=>{
                            setMenuMobileStyle({display:'none'})
                            props.history.push(["/","/upload","/nfts"][i])
                        },
                    }
                }
            })
        }
    }


    return (
        <>
        <div className={prefix.main({val:''})}>
            <h1 className={prefix.main({val:'Name'})}>{nav.name.text}</h1>
            <div className={prefix.pods[0]({val:''})}>
            {
                nav.links.items.map((x,i)=>{
                    return <a onClick={x.onClick}key={i} className={prefix.pods[0]({val:'Link'})}>{x.text}</a>
                })
            }
            <div onClick={nav.menu.icon.onClick} className={prefix.pods[0]({val:'MenuItem'})}></div>
            </div>
           
        </div>

        {/* mobile view */}
        <div style={nav.menu.mobile.style} className={prefix.pods[0]({val:'MenuPod'})}>
            {
                nav.links.items.map((x,i)=>{
                    return <a onClick={x.mobile.onClick}key={i} className={prefix.pods[0]({val:'MenuLink'})}>{x.text}</a>
                })
            }            
        </div>
        {/*  */}         


        </>
    )
    
}