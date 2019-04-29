import {Component, OnInit} from '@angular/core';
import {LoadingState} from './shared/loading.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoadignIcon = false;
  constructor(private store: Store<LoadingState>) { }

  ngOnInit() {
    this.store.select('loadingState')
      .subscribe((loadingState: LoadingState) => {
        this.showLoadignIcon = loadingState && loadingState.loading;
      });
  }
}
