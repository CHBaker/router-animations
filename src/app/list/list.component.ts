import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
    note: FormControl;
    formReady = false;
    notes = [
        'vacuum the cat',
        'relax on the sofa',
        'make dinner',
        'chill or be chilled'
    ];

    ngOnInit(): void {
        this.checkLocalStorage();
        this.initListForm();
    }

    checkLocalStorage() {
        if (this.LocalStorage !== null) {
            this.notes = this.LocalStorage;
        }
    }

    initListForm(): void {
        this.note = new FormControl('', Validators.required);
        this.formReady = true;
    }

    get LocalStorage() {
        return JSON.parse(localStorage.getItem('notes'));
    }

    set LocalStorage(notes: string[]) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    get newNote() {
        return this.note.value;
    }

    addNote(): void {
        if (this.note.valid) {
            this.notes.unshift(this.newNote);
            this.note.reset();
            this.LocalStorage = this.notes;
        }
    }

    deleteNote(note: string): void {
        this.notes = this.notes.filter(currNote => currNote !== note);
        this.LocalStorage = this.notes;
    }



    ngOnDestroy() {
        this.LocalStorage = this.notes;
    }
}
