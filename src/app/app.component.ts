import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { slideUpDownAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideUpDownAnimation]
})
export class AppComponent {

  title = 'ScrollSliderWebPage';

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }
  mouseWheelFunc = (event: any) => {

    if (event.wheelDelta >= 0) {
      console.log("PageUp");
    }

    else if (event.wheelDelta < 0) {
      console.log("PageDown");
    }
    else return;
  }
}
