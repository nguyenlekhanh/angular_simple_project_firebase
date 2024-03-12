import { Component } from '@angular/core';

import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [
    TopMenuComponent,
    MainMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent1 {
  
}
