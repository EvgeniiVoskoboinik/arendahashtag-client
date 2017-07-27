import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
               selector: 'app-checkbox',
               templateUrl: './checkbox.template.html',
               styleUrls: ['./checkbox.styles.scss'],
               changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class CheckboxComponent {
    @Input() checked: boolean;
    @Input() indeterminate: boolean;
    @Input() disabled: boolean;
    @Input() label: string;
    @Input() labelRight: boolean = true;
    @Output() onChange = new EventEmitter<boolean>();

    constructor() {
    }

    onChangeState() {
        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.onChange.emit(this.checked);
    }
}
