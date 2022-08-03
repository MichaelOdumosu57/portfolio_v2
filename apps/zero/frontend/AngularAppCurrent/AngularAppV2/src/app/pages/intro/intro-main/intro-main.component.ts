// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Renderer2 } from '@angular/core';

import { UtilityService } from '@app/core/utility/utility.service';
import { AutomationService } from '@helpers/automation/automation/automation.service';

// rxjs
import { fromEvent, Subject, timer } from 'rxjs';
import { tap, takeUntil } from "rxjs/operators";

// misc
import { CONFIG, THREE } from '@app/core/config/configs';

// three
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';



@Component({
  selector: 'intro-main',
  templateUrl: './intro-main.component.html',
  styleUrls: ['./intro-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class IntroMainComponent {

  constructor(
    private cdref: ChangeDetectorRef,
    private utilService: UtilityService,
    private renderer2: Renderer2,
    private automationService: AutomationService,
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub = new Subject<void>()
  camera!: CinematicCamera;
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene
  displayDiv!: HTMLElement 
  boxes!: THREE.Mesh[]
  phrase: any;
  zDimForCamera!: number
  zDimCounter: number = 0
  quotesAnimationsIsComplete: boolean = false;
  mainPodClass = "MainPod MainPodScreen0"

  ngAfterViewInit(): void {

    this.displayDiv = this.automationService.documentQuerySelector("intro-main .Pod0")
    this.setPhraseObject();
    this.init();
    this.animate();
    this.phraseTransitionEnd()

  }

  private setPhraseObject() {
    this.phrase = {
      items: this.utilService.getValueByi18nKey('intro.phrases')
        .map((value: string) => {
          return {
            value,
            class: this.utilService.selectRandomOptionFromArray([
              "Pod0Text0", "Pod0Text1", "Pod0Text2", "Pod0Text3"
            ])
          };
        }),

      display: {
        text: "",
        class: "",
        style: {},
        transitionend: this.phraseTransitionEnd,

      }
    };
  }

  moveIntroToAboveUsersScreen= ()=>{
    return timer(CONFIG.intro.moveIntroToAboveScreen)
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        this.mainPodClass = "MainPod MainPodScreen1"
        this.cdref.detectChanges()
        // console.log("fire")
      })
    )
  }

  phraseTransitionEnd = (evt?: TransitionEvent) => {

    this.zDimForCamera = 5000 - (this.zDimCounter * 300);
+
    timer(3000)
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{

        this.resetQuoteAnimation();
        this.cdref.detectChanges()

        if(this.zDimCounter > CONFIG.intro.phrasesCompleteNumber){
          this.quotesAnimationsIsComplete = true
          this.moveIntroToAboveUsersScreen().subscribe()
          return
        }        



        delete this.phrase.display.style.transition
        TWEEN.removeAll();
        new TWEEN.Tween(this.camera.position)
          .to(
            {
              x: 400,
              y: 400,
              z: this.zDimForCamera
            }
          )
          .onComplete(() => {
    
            this.presentationAnimationSubj.next(this.zDimCounter++)
          })
          .start();    
      })
    )
    .subscribe()
    
  }



  presentationAnimationSubj = (() => {
    let subj = new Subject<number>()

    subj
      .pipe(
        takeUntil(this.ngUnsub),
        tap((res) => {
          this.phrase.display.text = this.phrase.items[res].value;
          this.phrase.display.class = this.phrase.items[res].class;
          this.phrase.display.style.opacity = .8;
          this.cdref.detectChanges()

        })
      )
      .subscribe()

    return subj
  })()



  private resetQuoteAnimation() {
    delete this.phrase.display.style.opacity;
    this.phrase.display.style.transition = "none";
  }

  init() {

    this.camera = new THREE.CinematicCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.setLens(5);
    this.camera.position.set(
      CONFIG.intro.camera.start.x,
      CONFIG.intro.camera.start.y,
      CONFIG.intro.camera.start.z
    );


    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(CONFIG.intro.backgroundColor);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    let light = new THREE.DirectionalLight(0xffffff, 0.35);
    light.position.set(1, 1, 1).normalize();
    this.scene.add(light);

    this.createBoxes(this.scene);

    this.applyCanvasToDisplayDiv();
    this.resizeCanvasOnWindowResize().subscribe();

  }

  
  animate = () => {
    
    requestAnimationFrame(this.animate);
    TWEEN.update()

    this.boxes
      .forEach((box) => {
        box.rotateY(0.01);
      })

      if(this.quotesAnimationsIsComplete){
        this.triggerCinematicEffect();      
      }
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize = () => {

    let { displayDivWidth, displayDivHeight } = this.retrieveDimsOfDisplayDiv()
    this.camera.aspect = displayDivWidth / displayDivHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(displayDivWidth, displayDivHeight);

  }


  applyCanvasToDisplayDiv = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.setCanvasDimsBasedOnDisplayDiv();
    this.renderer2.appendChild(this.displayDiv, this.renderer.domElement);
  }

  retrieveDimsOfDisplayDiv = () => {

    let displayDivWidth = this.utilService.numberParse(getComputedStyle(this.displayDiv).width);
    let displayDivHeight = this.utilService.numberParse(getComputedStyle(this.displayDiv).height);
    return { displayDivWidth, displayDivHeight };
  }

  setCanvasDimsBasedOnDisplayDiv = () => {
    let { displayDivWidth, displayDivHeight } = this.retrieveDimsOfDisplayDiv();
    this.renderer.setSize(displayDivWidth, displayDivHeight);
  }

  theta = 0
  private triggerCinematicEffect() {
    this.theta -= .1;
    let radius = 100;
    this.camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
    this.camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
    this.camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(this.theta));
    this.camera.lookAt(this.scene.position);

    this.camera.updateMatrixWorld();
  }

  private resizeCanvasOnWindowResize() {
    return fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.ngUnsub),
        tap(this.onWindowResize)
      )
  }

  private createBoxes(scene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry(20, 20, 10);

    this.boxes = Array(15000)
      .fill(null)
      .map((_) => {
        let object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        object.position.x = Math.random() * 1500 - 400;
        object.position.y = Math.random() * 1500 - 400;
        object.position.z = Math.random() * 6000 - 400;

        scene.add(object);
        return object
      })
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}
