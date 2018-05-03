import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
    @ViewChild('lampLight') lampLight: ElementRef;

    buttonOn = true;

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.addClass(this.lampLight.nativeElement, 'animate-light');
    }

    turnLight() {
        this.buttonOn = !this.buttonOn;
        this.renderer.removeClass(this.lampLight.nativeElement, 'animate-light');
        if (this.buttonOn) {
            console.log('light on')
            this.renderer.removeClass(this.lampLight.nativeElement, 'lamp-off');
            this.renderer.addClass(this.lampLight.nativeElement, 'lamp-on');
        } else {
            console.log('light off')
            this.renderer.removeClass(this.lampLight.nativeElement, 'lamp-on');
            this.renderer.addClass(this.lampLight.nativeElement, 'lamp-off');
        }
    }
}
