import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { slideUpDownAnimation } from './route-animations';
import { Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideUpDownAnimation]
})

export class AppComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  components = ['/page1', '/page2', '/page3', '/page4'];
  currentComponent: number;
  routerSub: Subscription;
  private enableRouting = true;

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof(NavigationEnd)))
      .subscribe((event: NavigationEnd) => {
          this.currentComponent = this.components.indexOf(event.urlAfterRedirects);
      });
  }
  ngOnDestroy() {
    this.routerSub.unsubscribe();
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