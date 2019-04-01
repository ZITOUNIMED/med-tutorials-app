import { Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appDownloadButton]'
})
export class DownloadButtonDirective implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const btn = this.elementRef.nativeElement.children[0];
    btn.className = 'btn btn-default';
    btn.textContent = 'Excel';
    // btn.style.color = 'blue';
  }
}
