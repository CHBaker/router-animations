import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent {
    @ViewChild('home') home: ElementRef;
    @ViewChild('work') work: ElementRef;

    constructor(private renderer: Renderer2) {}

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    // animate pills
    flowToWork() {
        this.renderer.addClass(this.work.nativeElement, 'flow-work');
        this.renderer.addClass(this.home.nativeElement, 'flow-out-home');
    }

    flowToHome() {
        this.renderer.addClass(this.home.nativeElement, 'flow-home');
        this.renderer.addClass(this.work.nativeElement, 'flow-out-work');
    }
}
