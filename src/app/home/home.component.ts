import { Component, OnInit } from '@angular/core';
import {LoadingState} from "../shared/loading.state";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showLoadignIcon = false;
  constructor(private store: Store<LoadingState>) { }

  ngOnInit() {
    this.store.select('load')
      .subscribe((loadingState: LoadingState) => {
        this.showLoadignIcon = loadingState && loadingState.loading;
      });
  }

}
