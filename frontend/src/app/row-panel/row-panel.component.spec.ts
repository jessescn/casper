import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPanelComponent } from './row-panel.component';

describe('RowPanelComponent', () => {
  let component: RowPanelComponent;
  let fixture: ComponentFixture<RowPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
