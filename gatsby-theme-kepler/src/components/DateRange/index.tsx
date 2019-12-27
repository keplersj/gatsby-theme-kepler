import * as React from "react";

interface Props {
  startDate: string;
  startDateISO: string;
  endDate?: string;
  endDateISO?: string;
}

export const DateRange = (props: Props) => (
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
