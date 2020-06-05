import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { slideUpDownAnimation } from './route-animations';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideUpDownAnimation]
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private ref: ElementRef) { }

  title = 'ScrollSliderWebPage';

  public components = ['/page1', '/page2', '/page3', '/page4'];
  public currentComponent: number;


  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  ngOnInit(): void {
    this.router.navigate(['/page1']);
    this.currentComponent = 0;
  }

  mouseWheelFunc = (event: any) => {
      if (event.wheelDelta >= 0) this.navigateToPrevious();
      else if (event.wheelDelta < 0) this.navigateToNext();
      else return;
  }

  private navigateToNext() {
    console.log("PageUp");
    if (this.currentComponent + 1 < this.components.length) {
      let path = this.components[++this.currentComponent];
      this.router.navigate([path]);
    }
  }

  private navigateToPrevious() {
    console.log("PageDown");
    if (this.currentComponent > 0) {
      let path = this.components[--this.currentComponent];
      this.router.navigate([path]);
    }
  }
}
