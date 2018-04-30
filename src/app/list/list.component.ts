import { listAnimations } from './list.animations';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    animations: [listAnimations]
})
export class ListComponent implements OnInit, OnDestroy {
    note: FormControl;
    formReady = false;
    clear = false;
    default = false;
    defaultSpin = false;

    notes: string[];
    defaultNotes = [
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
        if (this.LocalStorage === null || this.LocalStorage.length === 0) {
            this.notes = [...this.defaultNotes];
        } else {
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
        console.log('note info, ', this.note.valid, this.notes.length);
        if (this.note.valid) {
            this.notes.unshift(this.newNote);
            this.note.reset();
            this.LocalStorage = this.notes;
        } else if (this.note.invalid && this.notes.length === 0) {
            this.notes = [...this.defaultNotes];
            this.LocalStorage = this.notes;
        } else if (this.note.invalid) {
            this.notes.length = 0;
            this.LocalStorage = this.notes;
        }
    }

    deleteNote(note: string): void {
        this.notes = this.notes.filter(currNote => currNote !== note);
        this.LocalStorage = this.notes;
    }

    options() {
        console.log('options ', this.note.invalid);
        if (this.note.invalid && this.notes.length === 0) {
            this.default = true;
        } else if (this.note.invalid) {
            this.clear = true;
        } else {
            this.clear = false;
            this.default = false;
        }
    }

    closeBubble() {
        this.clear = false;
        this.default = false;
    }

    ngOnDestroy() {
        this.LocalStorage = this.notes;
    }
}
