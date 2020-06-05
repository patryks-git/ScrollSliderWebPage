import { Component, HostListener, OnInit } from '@angular/core';
import { slideUpDownAnimation } from './route-animations';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideUpDownAnimation]
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  components = ['/page1', '/page2', '/page3', '/page4'];
  currentComponent: number;

  private enableRouting = true;


  ngOnInit() {
    this.currentComponent = this.components.indexOf(window.location.pathname);
  }

  animationDone($event) {
    this.enableRouting = true;
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }


  mouseWheelFunc = (event: any) => {
    if (this.enableRouting) {
      if (event.wheelDelta >= 0) this.navigateToPrevious();
      else this.navigateToNext();
    }
  }

  private navigateToNext() {
    if (this.currentComponent + 1 < this.components.length) {
      let path = this.components[++this.currentComponent];
      this.router.navigate([path]);
      this.enableRouting = false;
    }
  }

  private navigateToPrevious() {
    if (this.currentComponent > 0) {
      let path = this.components[--this.currentComponent];
      this.router.navigate([path]);
      this.enableRouting = false;
    }
  }
}
