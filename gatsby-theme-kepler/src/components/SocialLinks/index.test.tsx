import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { SocialLinks } from ".";
import { KeplerSocialLinksQuery } from "../../__mockData__";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation(
    (): object => KeplerSocialLinksQuery
  );
});

describe("SocialLinks", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer.create(<SocialLinks />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
