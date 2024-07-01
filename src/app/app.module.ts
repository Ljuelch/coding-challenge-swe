import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { NgxParticlesModule } from '@tsparticles/angular';
import { WikiContainerComponent } from './wiki-container/wiki-container.component';
import { SearchBarComponent } from './wiki-container/search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SuggestionListComponent } from './wiki-container/suggestion-list/suggestion-list.component';
import { ResultsComponent } from './wiki-container/results/results.component';
import { SwordComponent } from './sword/sword.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SaberSwitchComponent } from './saber-switch/saber-switch.component';
@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    PageLoaderComponent,
    WikiContainerComponent,
    SearchBarComponent,
    SuggestionListComponent,
    ResultsComponent,
    SwordComponent,
    NavbarComponent,
    SaberSwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxParticlesModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
