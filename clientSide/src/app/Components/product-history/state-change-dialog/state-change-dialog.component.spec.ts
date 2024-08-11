import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateChangeDialogComponent } from './state-change-dialog.component';

describe('StateChangeDialogComponent', () => {
  let component: StateChangeDialogComponent;
  let fixture: ComponentFixture<StateChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateChangeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
