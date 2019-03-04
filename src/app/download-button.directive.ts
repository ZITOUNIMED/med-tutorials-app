import { Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appDownloadButton]'
})
export class DownloadButtonDirective implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const btn = this.elementRef.nativeElement.children[0];
    btn.className = 'btn btn-sm bt-default pull-right';
    btn.textContent = 'Export';
    btn.style.color = 'blue';
  }
}
