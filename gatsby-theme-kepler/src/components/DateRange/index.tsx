import * as React from "react";
import { graphql } from "gatsby";

interface Props {
  startDate: string;
  startDateISO: string;
  endDate?: string;
  endDateISO?: string;
}

export const DateRange = (properties: Props): React.ReactElement<Props> => (
  <>
    <time dateTime={properties.startDateISO}>{properties.startDate}</time>
    {" - "}
    {properties.endDate && properties.endDateISO ? (
      <time dateTime={properties.endDateISO}>{properties.endDate}</time>
    ) : (
      // Assume if there is no end date, that we're still there
      "Present"
    )}
  </>
);

interface FrontmatterProps {
  frontmatter: KeplerFrontmatterDateRange;
}

export const FrontmatterDateRange = (properties: FrontmatterProps) => (
  <DateRange
    startDate={properties.frontmatter.start_date}
    startDateISO={properties.frontmatter.rawStart}
    endDate={properties.frontmatter.end_date}
    endDateISO={properties.frontmatter.rawEnd}
  />
);

export const fragment = graphql`
  fragment KeplerFrontmatterDateRange on MarkdownRemarkFrontmatter {
    rawEnd: end_date
    end_date(formatString: "MMM YYYY")
    rawStart: start_date
    start_date(formatString: "MMM YYYY")
  }
`;

export interface KeplerFrontmatterDateRange {
  rawEnd?: string;
  end_date?: string;
  rawStart: string;
  start_date: string;
}
