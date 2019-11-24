import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CatPageComponent } from './cat-page/cat-page.component';
import { CatCardComponent } from './components/cat-card/cat-card.component';
import { CatFromComponent } from './components/cat-from/cat-from.component';
import { CatsFilterPipe } from './pipes/cats-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CatPageComponent,
    CatCardComponent,
    CatFromComponent,
    CatsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
