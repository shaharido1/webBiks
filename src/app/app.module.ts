//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//router
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import {ANALYSIS, HOME, MONITOR, TRAINEE, TRAINEEID} from './URL';
//firebase
import { AngularFireModule } from 'angularfire2'
import { firebaseConfig } from './firebase.config'
//imported modules
import {Ng2PaginationModule} from 'ng2-pagination'
import {CustomReuseStrategy} from './reuse-strategy'
import {ToastModule} from 'ng2-toastr/ng2-toastr'
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';
import { CreateTraineeComponent } from './create-trainee/create-trainee.component'
//services
import { DataService } from './../services/data.service'
import {MappingService} from './../services/mapping.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnalysisComponent,
    MonitorComponent,
    CreateTraineeComponent
  ],
  imports: [
    ToastModule,
    BrowserModule,
    Ng2PaginationModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
      { path: HOME, component: HomeComponent },
      { path: ANALYSIS, component: AnalysisComponent },
      { path: MONITOR, component: MonitorComponent },
      { path: TRAINEE, component: CreateTraineeComponent },
      { path: TRAINEEID, component: CreateTraineeComponent},
      { path: '', redirectTo: HOME, pathMatch: 'full' },
      { path: '**', redirectTo: HOME, pathMatch: 'full' }
    ])
  ],
  providers: [DataService, MappingService, {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
