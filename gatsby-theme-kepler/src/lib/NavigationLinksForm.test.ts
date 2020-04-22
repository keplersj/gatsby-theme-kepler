import { NavigationLinksForm } from "./NavigationLinksForm";

describe("NavigationLinksForm", () => {
  it("returns as expected", () => {
    expect(NavigationLinksForm).toMatchSnapshot();
  });

  describe("field props", () => {
    it("returns the props of field item correctly", () => {
      const field = NavigationLinksForm.fields[0];

      const testItem = {
        name: "Test Name",
        url: "https://example.dev/",
      };

      expect(field.itemProps(testItem)).toMatchInlineSnapshot(`
        Object {
          "key": "Test Name",
          "label": "Test Name",
        }
      `);
    });
  });
});
