import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentContentComponent } from './document-content.component';
import { ElementType } from '../shared/element-type';
import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';

fdescribe('DocumentContentComponent', () => {
  let component: DocumentContentComponent;
  let fixture: ComponentFixture<DocumentContentComponent>;
  let documentServiceStubs;
  let appSnackbarServiceStubs;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentContentComponent ],
      providers: [
        { provide: DocumentService, useValue: {}},
        { provide: AppSnackbarService, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentContentComponent);
    component = fixture.componentInstance;
    initComponent();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('moveUp', () => {
    it('should move up in same page', () => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e10 = {
          id: null,
          type: ElementType.TEXT,
          text: 't10',
          row: 1,
          page: 0
        };
      component.document.elements = [e00, e10];
      component.currentPage = 20;

      // When
      component.moveUp(e10);

      // Then
      const e00_ = component.getElementAtPosition({row: 0, page: 0});
      const e10_ = component.getElementAtPosition({row: 1, page: 0});
      expect(e00_.text).toEqual('t10');
      expect(e10_.text).toEqual('t00');
      expect(component.currentPage).toEqual(0);
      expect(component.movedItem).toEqual({row: e00_.row, page: e00_.page});
    });

    it('should move up first item in a page else than the first page', () => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e10 = {
          id: null,
          type: ElementType.TEXT,
          text: 't10',
          row: 1,
          page: 0
        };
      const e01 = {
          id: null,
          type: ElementType.TEXT,
          text: 't01',
          row: 0,
          page: 1
        };
      const e11 = {
          id: null,
          type: ElementType.TEXT,
          text: 't11',
          row: 1,
          page: 1
        };
      component.document.elements = [e00, e10, e01, e11];
      component.currentPage = 20;

      // When
      component.moveUp(e01);

      // Then
      const e00_ = component.getElementAtPosition({row: 0, page: 0});
      const e10_ = component.getElementAtPosition({row: 1, page: 0});
      const e20_ = component.getElementAtPosition({row: 2, page: 0});
      const e01_ = component.getElementAtPosition({row: 0, page: 1});
      const e11_ = component.getElementAtPosition({row: 1, page: 1});
      expect(e00_.text).toEqual('t00');
      expect(e10_.text).toEqual('t10');
      expect(e20_.text).toEqual('t01');
      expect(e01_.text).toEqual('t11');
      expect(e11_).toBeFalsy();
      expect(component.currentPage).toEqual(0);
      expect(component.movedItem).toEqual({row: e20_.row, page: e20_.page});
    });

    it("shouldn't move up the first item in the first page", () => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e10 = {
          id: null,
          type: ElementType.TEXT,
          text: 't10',
          row: 1,
          page: 0
        };
      component.document.elements = [e00, e10];
      component.currentPage = 20;

      // When
      component.moveUp(e00);

      // Then
      const e00_ = component.getElementAtPosition({row: 0, page: 0});
      const e10_ = component.getElementAtPosition({row: 1, page: 0});
      expect(e00_.text).toEqual('t00');
      expect(e10_.text).toEqual('t10');
      expect(component.currentPage).toEqual(0);
      expect(component.cantMoveUp).toEqual(true);
      expect(component.movedItem).toEqual({row: e00_.row, page: e00_.page});
    });
  });

  describe('moveDown', () => {
    it('should move down in the same page',() => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e10 = {
          id: null,
          type: ElementType.TEXT,
          text: 't10',
          row: 1,
          page: 0
        };
      component.document.elements = [e00, e10];
      component.currentPage = 20;

      // When
      component.moveDown(e00);

      // Then
      const e00_ = component.getElementAtPosition({row: 0, page: 0});
      const e10_ = component.getElementAtPosition({row: 1, page: 0});
      expect(e00_.text).toEqual('t10');
      expect(e10_.text).toEqual('t00');
      expect(component.currentPage).toEqual(0);
      expect(component.movedItem).toEqual({row: e10_.row, page: e10_.page});
    });

    it('should move down the last item in a page', () => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e10 = {
          id: null,
          type: ElementType.TEXT,
          text: 't10',
          row: 1,
          page: 0
        };
      const e01 = {
          id: null,
          type: ElementType.TEXT,
          text: 't01',
          row: 0,
          page: 1
        };
      const e11 = {
          id: null,
          type: ElementType.TEXT,
          text: 't11',
          row: 1,
          page: 1
        };
      component.document.elements = [e00, e10, e01, e11];
      component.currentPage = 20;

      // When
      component.moveDown(e10);

      // Then
      const e00_ = component.getElementAtPosition({row: 0, page: 0});
      const e10_ = component.getElementAtPosition({row: 1, page: 0});
      const e01_ = component.getElementAtPosition({row: 0, page: 1});
      const e11_ = component.getElementAtPosition({row: 1, page: 1});
      const e21_ = component.getElementAtPosition({row: 2, page: 1});
      expect(e00_.text).toEqual('t00');
      expect(e10_).toBeFalsy(null);
      expect(e01_.text).toEqual('t10');
      expect(e11_.text).toEqual('t01');
      expect(e21_.text).toEqual('t11');
      expect(component.currentPage).toEqual(1);
      expect(component.movedItem).toEqual({row: e01_.row, page: e01_.page});
    });
  });

  describe('getElementAtPosition', () => {
    it('should get element at position', () => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e01 = {
          id: null,
          type: ElementType.TEXT,
          text: 't01',
          row: 0,
          page: 1
        };
      component.document.elements = [e00, e01];

      // Then
      const e01_ = component.getElementAtPosition({row: 0, page: 1});
      expect(e01_.text).toEqual('t01');
    });

    it("should return null when element doesn't existing", () => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e01 = {
          id: null,
          type: ElementType.TEXT,
          text: 't01',
          row: 0,
          page: 1
        };
      component.document.elements = [e00, e01];

      // Then
      const e11_ = component.getElementAtPosition({row: 1, page: 1});
      expect(e11_).toBeFalsy();
    });
  });

  describe('deleteElement', () => {
    it('should delete an element in a middle page', () => {
      // Given
      const e00 = {
          id: null,
          type: ElementType.TEXT,
          text: 't00',
          row: 0,
          page: 0
        };
      const e10 = {
          id: null,
          type: ElementType.TEXT,
          text: 't10',
          row: 1,
          page: 0
        };
      const e20 = {
          id: null,
          type: ElementType.TEXT,
          text: 't20',
          row: 2,
          page: 0
        };
      const e01 = {
          id: null,
          type: ElementType.TEXT,
          text: 't01',
          row: 0,
          page: 1
        };
      const e11 = {
          id: null,
          type: ElementType.TEXT,
          text: 't11',
          row: 1,
          page: 1
        };
      component.document.elements = [e00, e10, e20, e01, e11];
      component.currentPage = 20;
      component.movedItem = {row: e10.row, page: e10.page};

      // When
      component.deleteElement(e10);

      // Then
      const e00_ = component.getElementAtPosition({row: 0, page: 0});
      const e10_ = component.getElementAtPosition({row: 1, page: 0});
      const e20_ = component.getElementAtPosition({row: 2, page: 0});
      const e01_ = component.getElementAtPosition({row: 0, page: 1});
      const e11_ = component.getElementAtPosition({row: 1, page: 1});
      expect(e00_.text).toEqual('t00');
      expect(e10_.text).toEqual('t20');
      expect(e20_).toBeFalsy();
      expect(e01_.text).toEqual('t01');
      expect(e11_.text).toEqual('t11');
      expect(component.currentPage).toEqual(0);
      expect(component.movedItem).toEqual({row: -1, page: -1});
    });
  });

  function initComponent(){
    component.document = {
      id: null,
      name: name,
      elements: []
    };
  }
});
