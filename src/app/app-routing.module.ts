import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {HomeComponent} from './home/home.component'
import {AppLayoutComponent} from './app-layout/app-layout.component'
import {RequestSendNewComponent} from './request-send/request-send-new/request-send-new.component'
import {RequestSendShowComponent} from './request-send/request-send-show/request-send-show.component'
import {RequestSendActionComponent} from './request-send/request-send-action/request-send-action.component'

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent},
      {
        path: 'request-send', canActivate: [], children: [
          {path: 'new', component: RequestSendNewComponent},
          {path: ':id', component: RequestSendShowComponent},
          {path: ':id/action', component: RequestSendActionComponent},
        ],
      },
    ],
  },
  {path: '**', redirectTo: '/home'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    // enableTracing: this, // enable for testing purposes
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
