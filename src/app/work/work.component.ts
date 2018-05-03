import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
    @ViewChild('lampLight') lampLight: ElementRef;

    buttonOn = true;
    hours: number;
    minutes: number;
    seconds: number;
    time: string;
    day: string;
    month: string;

    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.addClass(this.lampLight.nativeElement, 'animate-light');
        setInterval(() => this.getTime(), 1000);
        this.getFullDate();
    }

    getTime() {
        const date = new Date();
        this.time = date.toLocaleString('en-US',
            { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }
        );
    }

    getFullDate() {
        const date = new Date();
        this.day = this.ordinal(date.getDate());
        this.month = this.months[date.getMonth()];
    }

    ordinal(num: number) {
        const last = ('' + num).split('').map(Number).pop();
        if (last === 1 && num !== 11) {
                return last + 'st';
        } else if (last === 2 && num !== 12) {
            return last + 'nd';
        } else if (last === 3 && num !== 13) {
            return last + 'rd';
        } else {
            return last + 'th';
        }
    }

    turnLight() {
        this.buttonOn = !this.buttonOn;
        this.renderer.removeClass(this.lampLight.nativeElement, 'animate-light');
        if (this.buttonOn) {
            this.renderer.removeClass(this.lampLight.nativeElement, 'lamp-off');
            this.renderer.addClass(this.lampLight.nativeElement, 'lamp-on');
        } else {
            this.renderer.removeClass(this.lampLight.nativeElement, 'lamp-on');
            this.renderer.addClass(this.lampLight.nativeElement, 'lamp-off');
        }
    }
}
