import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval } from "rxjs";
import { Document } from "./document/shared/document.model";
import { WakeUpServerService } from "./wake-up-server.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  document: Document;
  private timer: any;

  constructor(private wakeUpServerService: WakeUpServerService) {}

  ngOnInit() {
    this.timer = interval(5 * 60 * 1000);
    this.wakeUpServer();
    this.timer.subscribe(() => this.wakeUpServer());
  }

  onSelectDocument(document) {
    this.document = document;
  }

  onReturnToSelectDocument(doReturn: boolean) {
    if (doReturn) {
      this.document = null;
    }
  }

  wakeUpServer() {
    this.wakeUpServerService.wakeUp().subscribe(
      res => {
        // console.log("Server is awake!");
      },
      error => {
        console.error("Server is down.");
      }
    );
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }
}
