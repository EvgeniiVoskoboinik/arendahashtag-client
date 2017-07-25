import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-input-layout',
    templateUrl: './input-layout.template.html',
    styleUrls: ['./input-layout.style.scss'],
})
export class InputLayoutComponent {
    @Input() icon: string;
    @Input() caption: string;
    @Input() description: string;
    @Input() error: string;
    @Input() errors: string[];
    @Input() required: boolean;
}
