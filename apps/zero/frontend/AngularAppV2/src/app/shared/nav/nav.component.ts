import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CONFIG } from '@core/config/configs';

@Component({
  selector: 'shared-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  constructor() { }
  CONFIG = CONFIG

  ngOnInit(): void {
    
  }

}
