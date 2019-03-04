import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateDocumentModalComponent } from './create-update-document-modal.component';

describe('CreateUpdateDocumentModalComponent', () => {
  let component: CreateUpdateDocumentModalComponent;
  let fixture: ComponentFixture<CreateUpdateDocumentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateDocumentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
