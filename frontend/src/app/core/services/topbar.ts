import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TopbarService {
  private configProject = new BehaviorSubject<any>(null);
  config$ = this.configProject.asObservable();

  // add action subject
  private actionSubject = new Subject<string>();
  action$ = this.actionSubject.asObservable()

  // use methog
  setConfig(config: any): void{
    this.configProject.next(config)
  }

  emitAction(action: string): void {
    this.actionSubject.next(action)
  }

}
