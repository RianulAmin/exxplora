import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CardModule } from 'primeng/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';
import { DomainCardComponent } from './components/domain-card/domain-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftMenuComponent,
    ProfileCardComponent,
    HeaderComponent,
    NavbarComponent,
    MainPanelComponent,
    RightMenuComponent,
    DomainCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
