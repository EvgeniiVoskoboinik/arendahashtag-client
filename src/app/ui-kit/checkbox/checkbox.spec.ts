import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {CheckboxComponent} from './checkbox.component';

describe('Ui kit. Checkbox.', () => {

    let comp: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;
    let clickable: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                declarations: [CheckboxComponent],
            },
        );

        fixture = TestBed.createComponent(CheckboxComponent);
        comp = fixture.componentInstance;

        clickable = fixture.debugElement.query(By.css('.beh-checkbox-container'));
    });

    it('Click_ChangesValue', () => {
        comp.checked = true;

        clickable.nativeElement.click();
        fixture.detectChanges();

        expect(comp.checked).toBeFalsy();
    });

    it('WhenDisabled_Click_NotChangesValue', () => {
        comp.checked = true;
        comp.disabled = true;

        clickable.nativeElement.click();
        fixture.detectChanges();

        expect(comp.checked).toBeTruthy();
    });
});