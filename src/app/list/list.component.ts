import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    note: FormControl;
    formReady = false;
    notes = [
        'relax on the sofa',
        'make dinner',
        'chill or be chilled'
    ];

    ngOnInit(): void {
        this.initListForm();
    }

    initListForm(): void {
        this.note = new FormControl(
            '', Validators.required
        );
        this.formReady = true;
    }

    get newNote() {
        return this.note.value;
    }

    set newNote(note: string) {
        this.note.setValue(note);
    }

    addNote(): void {
        this.notes.unshift(this.newNote);
        this.note.reset();
    }

    deleteNote(note: string): void {
        this.notes.filter(currNote => currNote !== note);
    }
}
