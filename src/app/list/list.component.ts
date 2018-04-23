import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    listForm: FormControl;
    formReady = false;
    notes = [
        'relax on the sofa',
        'make dinner',
        'chill or be chilled'
    ];

    ngOnInit() {
        this.initListForm();
    }

    initListForm () {
        this.listForm = new FormControl({
            note: [null, Validators.required]
        });
        this.formReady = true;
    }

    addNote(note: string) {
        this.notes.push(note);
    }

    deleteNote(note: string) {
        this.notes.filter(currNote => currNote !== note);
    }
}
