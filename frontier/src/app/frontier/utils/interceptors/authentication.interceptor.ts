import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTransactionId, selectUser } from '../store/selectors';
import { UserInterface } from 'src/app/interfaces/user-interface';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private transactionId: string;
  private user: UserInterface;
  private transactionIdSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private store: Store<any>) {
    this.transactionIdSubscription = this.store.select(selectTransactionId).subscribe((transactionId) => {
      this.transactionId = transactionId;
    })
    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.transactionIdSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let requestWithHeaders: HttpRequest<unknown> = request.clone({
      setHeaders: { "agentId": this.user.agentId.toString(), "transactionId": this.transactionId }
    });
    return next.handle(requestWithHeaders);
  }
}
