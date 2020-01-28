import * as React from "react";
const gatsby = jest.requireActual("gatsby");

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn(
    ({
      // these props are invalid for an `a` tag
      /* eslint-disable @typescript-eslint/no-unused-vars */
      /* eslint-disable no-unused-vars */
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      /* eslint-enable no-unused-vars */
      to,
      ...rest
      // eslint-disable-next-line jsx-a11y/anchor-has-content
    }): React.ReactElement => <a {...rest} href={to} />
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn()
};
