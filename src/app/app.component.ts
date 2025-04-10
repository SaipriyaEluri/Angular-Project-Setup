import { Component, ElementRef, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
// import { LocalTimeZoneService } from './Services/LocalTimeZone.service'; 
// import { DateTime } from "luxon";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private style?: HTMLLinkElement;
  constructor(@Inject(DOCUMENT) private document: Document,private renderer2: Renderer2,private router: Router) {}

  ngOnInit() {
    // console.log(DateTime.now().setZone('Asia/Kolkata').toISO(), 'DateTime.now()');
    
    window.addEventListener('storage', (event) => {
      if (event.key === 'logoutEvent') {
        console.log('logout event');
        this.router.navigate(['/auth/login']);
      }else if(event.key==='loginEvent'){
        window.location.reload();
        // this.router.navigate(['/admin/common/summary']);
        console.log(event.key, 'event.key loginEvent event');
      }
    });
  }
  
  public ngAfterViewInit(): void {
    const cssPathArray = ['assets/SCSS/bootstrap-grid.min.css', 'assets/SCSS/bootstrap-form.css', 'assets/SCSS/fontFamily.css', 'assets/SCSS/bootstrap-common.css', 'assets/SCSS/bootstrap-table.css', 'https://fonts.googleapis.com/icon?family=Material+Icons', 'assets/SCSS/custom-angular-material.css'];
    for (let i = 0; i < cssPathArray.length; i++) {
      this.style = this.renderer2.createElement('link') as HTMLLinkElement;
      this.renderer2.appendChild(this.document.head, this.style);
      this.renderer2.setProperty(this.style, 'rel', 'stylesheet');
      this.renderer2.setProperty(this.style, 'href', cssPathArray[i]);
    }
    setTimeout(() => {
      (document.getElementById('loader-content') as HTMLElement).style.display="none";
      (document.body as HTMLElement).style.overflowY="auto";
    }, 500);


    const root:any = document.querySelector(':root');
    const setVariables = (vars: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
    const myVariables = {
      '--mdc-outlined-text-field-hover-outline-color': '#CED4DA',
      '--mdc-outlined-text-field-outline-color': '#CED4DA',
      '--mdc-outlined-text-field-label-text-color': '#666666',
      '--mat-option-label-text-size': '0.813rem',
      '--mdc-icon-button-state-layer-size': '2.375rem',
      '--mat-tab-header-inactive-label-text-color': '#515D69',
      '--mdc-outlined-text-field-disabled-label-text-color': '#666666',
      '--mdc-outlined-text-field-disabled-input-text-color': '#343A40',
      '--mdc-outlined-text-field-disabled-outline-color': '#CED4DA',
    };
    setVariables(myVariables);
    // const root:any = document.querySelector(':root');
    // const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
    // const myVariables = {
    //   '--mdc-outlined-text-field-disabled-label-text-color': '#CED4DA',
    //   '--mdc-outlined-text-field-outline-color': '#CED4DA',
    //   '--mdc-outlined-text-field-label-text-color': '#666666',
    //   '--mat-option-label-text-size': '0.813rem',
    //   '--mdc-icon-button-state-layer-size': '2.375rem',
    //   '--mat-tab-header-inactive-label-text-color': '#515D69',
    //   // '--color-primary-200': '#bfdbfe',
    //   // '--color-primary-300': '#93c5fd',
    //   // '--color-primary-400': '#60a5fa',
    //   // '--color-primary-500': '#3b82f6',
    //   // '--color-primary-600': '#2563eb',
    //   // '--color-primary-700': '#1d4ed8',
    //   // '--color-primary-800': '#1e40af',
    //   // '--color-primary-900': '#1e3a8a',
    // };
    // setVariables(myVariables);

    if (!isDevMode()){
      // document.addEventListener('contextmenu', function(e) {
      //   e.preventDefault();
      // });
    }
  }
}
