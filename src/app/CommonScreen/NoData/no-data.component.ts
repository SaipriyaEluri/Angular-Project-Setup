import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {
  themeColor: any = "warn";
  @Input() loading?: boolean = false;
  @Input() source?: string = 'assets/Images/no-data.avif';
  interval: any;
  ngAfterViewInit() {
    this.changeSpinnerColor();
  }

  private changeSpinnerColor(): void {
    const root: any = document.querySelector(':root');
    const setVariables = (vars: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]))
    const colors = ['#29dc29', '#e91e63', 'blue','#fdb93f'];
    var currentIndex = 0;
    this.interval = setInterval(function () {
      if (currentIndex > 3) { currentIndex = 0; }
      setVariables({ '--spinner-color': colors[currentIndex] });
      currentIndex++;
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
