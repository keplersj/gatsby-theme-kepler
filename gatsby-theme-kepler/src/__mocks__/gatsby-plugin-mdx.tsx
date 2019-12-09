import * as React from "react";

const MDXRenderer = ({ children }: any): React.ReactElement => (
  <p>{children}</p>
);

module.exports = {
  MDXRenderer
};
