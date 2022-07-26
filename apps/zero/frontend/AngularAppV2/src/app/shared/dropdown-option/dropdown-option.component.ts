// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { WMLWrapper } from '@shared/wml-components/models';

// rxjs
import { Subject } from 'rxjs';

@Component({
  selector: 'dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownOptionComponent implements OnInit {


  @Input('meta') meta: DropdownOptionMeta = new DropdownOptionMeta();
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()
  constructor(
    private cdref:ChangeDetectorRef
  ) { }




  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.meta.view.cdref = this.cdref
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }


}

export class DropdownOptionMeta extends WMLWrapper{
  constructor(params:Partial<DropdownOptionMeta>={}){
    super();
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  
  title:string= "My Option"
  subTitle:string = "My Subtext"
  selectChevronIsPresent =false
}
