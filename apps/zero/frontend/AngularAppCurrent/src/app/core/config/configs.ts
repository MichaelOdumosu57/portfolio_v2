import { environment as env } from '@environment/environment';

// three.js
import {MathUtils,Scene,Color,AmbientLight,DirectionalLight,BoxGeometry,Mesh,MeshLambertMaterial,WebGLRenderer}   from 'three' ;
import {CinematicCamera} from 'three/examples/jsm/cameras/CinematicCamera';

export let THREE =  {MathUtils,Scene,Color,CinematicCamera,AmbientLight,DirectionalLight,BoxGeometry,Mesh,MeshLambertMaterial,WebGLRenderer}

class Configs {


  classPrefix= {
    certsMain:"CertsMain",
    footer:"Footer",
    contactMain:"ContactMain",
    homeMain:"HomeMain",
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
  certsMain={
    categories:["aws","codecademy","coursera","gcp","pluralsight"]
  }
  contactMain= {
    nameFieldFormControlName:"name",
    emailFieldFormControlName:"email",
    subjectFieldFormControlName:"subject",
    msgTextFieldFormControlName:"message",
    submitFormEndpoint:"http://localhost:5000/contact/submit",
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
    this.intro.moveIntroToAboveScreen = 3000
    this.intro.phrasesCompleteNumber = 4
  }
}

export let CONFIG = !env.production    ?  new Configs() : new DefaultConfigs()