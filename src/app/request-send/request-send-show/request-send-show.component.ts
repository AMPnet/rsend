import {ChangeDetectionStrategy, Component} from '@angular/core'
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs'
import {withStatus, WithStatus} from '../../shared/utils/observables'
import {DialogService} from '../../shared/services/dialog.service'
import {ActivatedRoute} from '@angular/router'
import {RequestSend, RequestSendService, SendRequestStatus} from '../request-send.service'
import {PreferenceStore} from '../../preference/state/preference.store'

@Component({
  selector: 'app-request-send-show',
  templateUrl: './request-send-show.component.html',
  styleUrls: ['./request-send-show.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestSendShowComponent {
  requestSend$: Observable<WithStatus<RequestSend>>
  refreshRequestSendSub = new BehaviorSubject<void>(undefined)

  sendRequestStatus = SendRequestStatus

  constructor(private requestSendService: RequestSendService,
              private dialogService: DialogService,
              private preferenceStore: PreferenceStore,
              private route: ActivatedRoute) {
    const requestID = this.route.snapshot.params.id

    this.requestSend$ = withStatus(
      this.refreshRequestSendSub.asObservable().pipe(
        switchMap(() => this.requestSendService.getRequest(requestID)),
        tap(req => this.preferenceStore.update({chainID: req.chain_id}))
      ),
    )
  }
}
