import {
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    HostListener,
} from '@angular/core';

@Component({
               selector: 'app-tab',
               template: `<span #span [ngClass]="{'active': active}"><ng-content></ng-content></span>`,
               styleUrls: ['./tab.style.scss'],
           })
export class TabComponent {
    @ViewChild('span') public tabElementRef: ElementRef;

    @Input() key: any;
    @Output() public clicked = new EventEmitter<any>();

    public active: boolean;

    constructor(public changeDetectorRef: ChangeDetectorRef) {

    }

    @HostListener('click')
    public onClick() {
        this.clicked.emit(this.key);
    }
}
