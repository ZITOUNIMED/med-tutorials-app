import { Directive, Input, OnChanges, ElementRef } from '@angular/core';

@Directive({
    selector: '[appPermission]'
})
export class AppPermissionDirective implements OnChanges {

    @Input() permission: { roles: any[], permissions: any[]};

    constructor(private el: ElementRef) { }

    ngOnChanges(changes: any){
        if(changes.permission){
            console.log(this.permission);
            console.log(this.el);
        }
    }
}
