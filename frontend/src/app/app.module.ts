import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { RowPanelComponent } from './row-panel/row-panel.component';
import { NewsService } from './services/news.service';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    RowPanelComponent,
    HomeComponent,
    ModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule

  ],
  providers: [NewsService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
