import * as React from "react";

export const MDXRenderer = jest
  .fn()
  .mockImplementation(
    ({ children }: React.PropsWithChildren<{}>): React.ReactElement => (
      <p>{children}</p>
    )
  );
