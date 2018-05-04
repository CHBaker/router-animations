import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { ListComponent } from './list/list.component';


@NgModule({
    declarations: [AppComponent, HomeComponent, WorkComponent, ListComponent],
    imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
