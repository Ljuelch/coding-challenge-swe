import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { NgxParticlesModule } from '@tsparticles/angular';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    PageLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
