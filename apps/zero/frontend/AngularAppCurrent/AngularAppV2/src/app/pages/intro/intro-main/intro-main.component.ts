// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';

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
    private el:ElementRef
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()  
  camera!:CinematicCamera ;
  renderer!:THREE.WebGLRenderer
  scene!:THREE.Scene

  ngAfterViewInit(): void {

    this.init();
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
    this.animate(); 
  }
  
  animate= ()=> {
    requestAnimationFrame( this.animate );
    this.renderer.render( this.scene, this.camera );
  }
  

  private applyCanvasToDisplayDiv() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    let displayDiv = document.querySelector('intro-main .MainPod');
    let displayDivWidth = this.utilService.numberParse(getComputedStyle(this.el.nativeElement).width);
    let displayDivHeight = this.utilService.numberParse(getComputedStyle(this.el.nativeElement).height);
    this.renderer.setSize(displayDivWidth, displayDivHeight);
    this.renderer2.appendChild(displayDiv, this.renderer.domElement);
  }

  private createBoxes(scene:THREE.Scene) {
    const geometry = new THREE.BoxGeometry(20, 20, 20);

    Array(15000)
    .fill(null)
    .map((_)=>{
      let object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

      object.position.x = Math.random() * 1500 - 400;
      object.position.y = Math.random() * 1500 - 400;
      object.position.z = Math.random() * 6000 - 400;

      scene.add(object);    
    })
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}
