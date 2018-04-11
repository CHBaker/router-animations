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
                } else {
                    console.log(e.url.split('/'));
                    this.renderer.addClass(this.bar1.nativeElement, 'starting-work-1');
                    this.renderer.addClass(this.bar2.nativeElement, 'starting-work-2');
                }
            }
        });
        this.startingStylesApplied = false;
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    // animate pills and bars
    flowToWork() {
        if (this.startingStylesApplied) {
            this.renderer.removeClass(this.bar1.nativeElement, 'starting-work-1');
            this.renderer.removeClass(this.bar2.nativeElement, 'starting-work-2');
        }

        this.renderer.addClass(this.work.nativeElement, 'flow-work');
        this.renderer.addClass(this.home.nativeElement, 'flow-out-home');

        this.renderer.removeClass(this.bar1.nativeElement, 'animate-home-1');
        this.renderer.removeClass(this.bar2.nativeElement, 'animate-home-2');
        this.renderer.addClass(this.bar1.nativeElement, 'animate-work-1');
        this.renderer.addClass(this.bar2.nativeElement, 'animate-work-2');
    }

    flowToHome() {
        if (this.startingStylesApplied) {
            this.renderer.removeClass(this.bar1.nativeElement, 'starting-home-1');
            this.renderer.removeClass(this.bar2.nativeElement, 'starting-home-2');
        }

        this.renderer.addClass(this.home.nativeElement, 'flow-home');
        this.renderer.addClass(this.work.nativeElement, 'flow-out-work');

        this.renderer.removeClass(this.bar1.nativeElement, 'animate-work-1');
        this.renderer.removeClass(this.bar2.nativeElement, 'animate-work-2');
        this.renderer.addClass(this.bar1.nativeElement, 'animate-home-1');
        this.renderer.addClass(this.bar2.nativeElement, 'animate-home-2');
    }
}
