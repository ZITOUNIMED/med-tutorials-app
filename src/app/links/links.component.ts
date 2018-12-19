import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.css"]
})
export class LinksComponent implements OnInit {
  @Input() links: string[] = [];

  constructor() {}

  ngOnInit() {}
}
