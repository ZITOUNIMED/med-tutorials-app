import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPaletteComponent } from './document-palette.component';

describe('DocumentPaletteComponent', () => {
  let component: DocumentPaletteComponent;
  let fixture: ComponentFixture<DocumentPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
