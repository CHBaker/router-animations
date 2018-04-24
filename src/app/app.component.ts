import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from './router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
    @ViewChild('home') home: ElementRef;
    @ViewChild('work') work: ElementRef;
    @ViewChild('bar1') bar1: ElementRef;
    @ViewChild('bar2') bar2: ElementRef;
    @ViewChild('house') house: ElementRef;

    routerSub: Subscription;
    startingStylesApplied = true;

    constructor(private renderer: Renderer2,
                private router: Router) {}

    ngOnInit() {
        this.routerSub = this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                if (e.url.split('/').indexOf('home') !== -1) {
                    console.log(e.url.split('/'));
                    this.renderer.addClass(this.bar1.nativeElement, 'starting-home-1');
                    this.renderer.addClass(this.bar2.nativeElement, 'starting-home-2');

                    this.renderer.addClass(this.house.nativeElement, 'house-home-state');
                } else {
                    console.log(e.url.split('/'));
                    this.renderer.addClass(this.bar1.nativeElement, 'starting-work-1');
                    this.renderer.addClass(this.bar2.nativeElement, 'starting-work-2');

                    this.renderer.addClass(this.house.nativeElement, 'house-work-state');
                }
            }
        });
        this.startingStylesApplied = false;
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    // animate pills and bars and house
    flowToWork() {
        this.renderer.addClass(this.work.nativeElement, 'flow-work');
        this.renderer.addClass(this.home.nativeElement, 'flow-out-home');

        this.renderer.removeClass(this.bar1.nativeElement, 'animate-home-1');
        this.renderer.removeClass(this.bar2.nativeElement, 'animate-home-2');
        this.renderer.addClass(this.bar1.nativeElement, 'animate-work-1');
        this.renderer.addClass(this.bar2.nativeElement, 'animate-work-2');

        this.renderer.addClass(this.house.nativeElement, 'move-house-out');
        this.renderer.removeClass(this.house.nativeElement, 'move-house-in');
    }

    flowToHome() {
        this.renderer.addClass(this.home.nativeElement, 'flow-home');
        this.renderer.addClass(this.work.nativeElement, 'flow-out-work');

        // wait for contents to come in, then bring in house
        setTimeout(() => {
            this.renderer.removeClass(this.bar1.nativeElement, 'animate-work-1');
            this.renderer.removeClass(this.bar2.nativeElement, 'animate-work-2');
            this.renderer.addClass(this.bar1.nativeElement, 'animate-home-1');
            this.renderer.addClass(this.bar2.nativeElement, 'animate-home-2');

            this.renderer.addClass(this.house.nativeElement, 'move-house-in');
            this.renderer.removeClass(this.house.nativeElement, 'move-house-out');
        }, 400);
    }
}
