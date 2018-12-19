import { TestBed } from "@angular/core/testing";

import { ElementsBuilderService } from "./elements-builder.service";

describe("ElementsBuilderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ElementsBuilderService = TestBed.get(ElementsBuilderService);
    expect(service).toBeTruthy();
  });
});
