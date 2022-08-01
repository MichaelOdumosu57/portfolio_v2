// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';
import { AutomationService } from '@helpers/automation/automation/automation.service';

// rxjs
import { fromEvent, interval, Subject } from 'rxjs';
import {  tap,takeUntil,take, startWith} from "rxjs/operators";

// misc
import { CONFIG ,THREE} from '@app/core/config/configs';

// three
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';



@Component({
  selector: 'intro-main',
  templateUrl: './intro-main.component.html',
  styleUrls: ['./intro-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class IntroMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService,
    private renderer2:Renderer2,
    private el:ElementRef,
    private automationService:AutomationService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()  
  camera!:CinematicCamera ;
  renderer!:THREE.WebGLRenderer
  scene!:THREE.Scene
  displayDiv!:HTMLElement 
  boxes!:THREE.Mesh[]

  ngAfterViewInit(): void {

    this.displayDiv = this.automationService.documentQuerySelector("intro-main .Pod0")
    this.init();
    this.animate(); 
    interval(2000)
    .pipe(
      startWith(0),
      take(5),
      tap((res)=>{

        let z = 5000 - (res*300)
        TWEEN.removeAll()
        new TWEEN.Tween(this.camera.position)
        .to(
          {
            x:400,
            y:400,
            z            
          }
        )
        .start()
      
      })
    )
    .subscribe()
  }

  init(){

    this.camera = new THREE.CinematicCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.setLens( 5 );
    this.camera.position.set( 
      CONFIG.intro.camera.start.x,
      CONFIG.intro.camera.start.y, 
      CONFIG.intro.camera.start.z
    );


    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( CONFIG.intro.backgroundColor );
    this.scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
    let light = new THREE.DirectionalLight( 0xffffff, 0.35 );
    light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( light );

    this.createBoxes(this.scene);   
    
    this.applyCanvasToDisplayDiv();   
    this.resizeCanvasOnWindowResize().subscribe();
    
  }
  
  animate= ()=> {
    requestAnimationFrame( this.animate );
    TWEEN.update()

    this.boxes
    .forEach((box)=>{
      box.rotateY(0.01);
    })
    this.renderer.render( this.scene, this.camera );
  }

  onWindowResize = ()=> {

    let {displayDivWidth, displayDivHeight} = this.retrieveDimsOfDisplayDiv()
    this.camera.aspect = displayDivWidth / displayDivHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( displayDivWidth, displayDivHeight );

  }
  

  applyCanvasToDisplayDiv = ()=> {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.setCanvasDimsBasedOnDisplayDiv();
    this.renderer2.appendChild(this.displayDiv, this.renderer.domElement);
  }

  retrieveDimsOfDisplayDiv= ()=> {
    let displayDivWidth =  this.utilService.numberParse(getComputedStyle(this.displayDiv).width);
    let displayDivHeight = this.utilService.numberParse(getComputedStyle(this.displayDiv).height);
    return {displayDivWidth, displayDivHeight};
  }

  setCanvasDimsBasedOnDisplayDiv= ()=> {
    let {displayDivWidth, displayDivHeight} =this.retrieveDimsOfDisplayDiv();
    this.renderer.setSize(displayDivWidth, displayDivHeight);
  }

  private resizeCanvasOnWindowResize() {
    return fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.ngUnsub),
        tap(this.onWindowResize)
      )
  }

  private createBoxes(scene:THREE.Scene) {
    const geometry = new THREE.BoxGeometry(20, 20, 10);

    this.boxes =Array(15000)
    .fill(null)
    .map((_)=>{
      let object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

      object.position.x = Math.random() * 1500 - 400;
      object.position.y = Math.random() * 1500 - 400;
      object.position.z = Math.random() * 6000 - 400;

      scene.add(object); 
      return object   
    })
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}
