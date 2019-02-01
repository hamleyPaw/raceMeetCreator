import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RaceMeetGeneratorComponent } from './race-meet-generator/race-meet-generator.component';
import { RaceMeetDetailsComponent } from './race-meet-details/race-meet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RaceMeetGeneratorComponent,
    RaceMeetDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
