import * as React from "react";
import { graphql } from "gatsby";

interface Props {
  startDate: string;
  startDateISO: string;
  endDate?: string;
  endDateISO?: string;
}

export const DateRange = (props: Props): React.ReactElement<Props> => (
  <>
    <time dateTime={props.startDateISO}>{props.startDate}</time>
    {" - "}
    {props.endDate && props.endDateISO ? (
      <time dateTime={props.endDateISO}>{props.endDate}</time>
    ) : (
      // Assume if there is no end date, that we're still there
      "Present"
    )}
  </>
);

interface FrontmatterProps {
  frontmatter: KeplerFrontmatterDateRange;
}

export const FrontmatterDateRange = (props: FrontmatterProps) => (
  <DateRange
    startDate={props.frontmatter.start_date}
    startDateISO={props.frontmatter.rawStart}
    endDate={props.frontmatter.end_date}
    endDateISO={props.frontmatter.rawEnd}
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
