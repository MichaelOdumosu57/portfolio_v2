import { environment as env } from '@environment/environment';

// three.js
import {MathUtils,Scene,Color,AmbientLight,DirectionalLight,BoxGeometry,Mesh,MeshLambertMaterial,WebGLRenderer}   from 'three' ;
// import {MathUtils,Scene,Color,AmbientLight,DirectionalLight,BoxGeometry,Mesh,MeshLambertMaterial,WebGLRenderer} as THREE from 'https://cdn.jsdelivr.net/npm/three@0.143.0/build/three.module.js';
import {CinematicCamera} from 'three/examples/jsm/cameras/CinematicCamera';

export let THREE =  {MathUtils,Scene,Color,CinematicCamera,AmbientLight,DirectionalLight,BoxGeometry,Mesh,MeshLambertMaterial,WebGLRenderer}

class Configs {
  homepage={
    nameFieldFormControlName:"myName",
    dropdownFieldFormControlName:"myDropdown",
    textAreaFieldFormControlName:"myTextArea",
  }
  form={
    nameFieldFormControlName:"myName",
    proficiencyFieldFormControlName:"myProficiency",
    descFieldFormControlName:"myDesc",
    aptitudeFieldFormControlName:"myAptitude",
    helpTextFieldFormControlName:"myHelpText",
    clientStakeHldrFieldFormControlName:"myClientStakeHldr",
    presenterFieldFormControlName:"myPresenter",
    submitFormEndpoint:"http://localhost:5000/form/submit",
  }
  classPrefix= {
    certsMain:"CertsMain",
    footer:"Footer",
  }

  intro={
    backgroundColor:0xA0B86A,
    camera:{
      start:{
        x: 400, 
        y: 400,
        z: 5700
      }
    },
    moveIntroToAboveScreen:1000,
    phrasesCompleteNumber:0
  }
  nav = {
    home:"/",
    homeAlt:"/home",
    form:"/form",
    intro:"/intro",
    resume:"/resume",
    stories:"/stories",
    certs:"/certs",
    contact:"/contact",
    startURL:"/intro",
    initialURL:""
  }
}

class DefaultConfigs extends Configs  {

  constructor(){
    super()
  }
}

export let CONFIG = !env.production    ?  new Configs() : new DefaultConfigs()