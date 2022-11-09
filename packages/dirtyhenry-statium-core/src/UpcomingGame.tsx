import * as React from "react";

type Props = {
  date: Date;
  localizedHomeTeam: string;
  localizedAwayTeam: string;
  calendarUrl: URL;
  tvChannels: [string];
};

const UpcomingGame = ({
  date,
  localizedHomeTeam,
  localizedAwayTeam,
  calendarUrl,
  tvChannels,
}: Props) => {
  return (
    <div>
      <span>{date.toISOString()}</span>
      <span>{localizedHomeTeam}</span>
      <span>{localizedAwayTeam}</span>
      <span>{calendarUrl.toString()}</span>
      {tvChannels.map((c) => (
        <span>{c}</span>
      ))}
    </div>
  );
};

export default UpcomingGame;
