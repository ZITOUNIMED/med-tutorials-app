import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSheetComponent } from './document-sheet.component';

xdescribe('DocumentSheetComponent', () => {
  let component: DocumentSheetComponent;
  let fixture: ComponentFixture<DocumentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
