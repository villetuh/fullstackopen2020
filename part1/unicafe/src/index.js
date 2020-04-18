import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Feedback = ({clickCounts, eventHandlers}) => {
  return (
    <div>
      <h2>Feedback</h2>
      <div>
        <Button handleClick={() => eventHandlers.setGood(clickCounts.good + 1)} text="Good" />
        <Button handleClick={() => eventHandlers.setNeutral(clickCounts.neutral + 1)} text="Neutral" />
        <Button handleClick={() => eventHandlers.setBad(clickCounts.bad + 1)} text="Bad" />
      </div>
    </div>
  );
};

const Statistics = ({clickCounts}) => {
  const totalClicks = clickCounts.good + clickCounts.neutral + clickCounts.bad;
  const averageClickValue = (clickCounts.good - clickCounts.bad) / totalClicks;
  const percentageOfPositive = clickCounts.good / totalClicks * 100.0;

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <Statistic label="Good" value={clickCounts.good} />
        <Statistic label="Neutral" value={clickCounts.neutral} />
        <Statistic label="Bad" value={clickCounts.bad} />
        <Statistic label="All" value={totalClicks} />
        <Statistic label="Average" value={isNaN(averageClickValue) ? "-" : Math.round(averageClickValue * 1000) / 1000} />
        <Statistic label="Positive %" value={isNaN(percentageOfPositive) ? "-" : Math.round(percentageOfPositive * 10) / 10} />
      </div>
    </div>
  );
};

const Statistic = ({label, value}) => (
  <div>{label}: {value}</div>
  );

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickCounts = {
    good: good,
    neutral: neutral,
    bad: bad
  };

  const eventHandlers = {
    setGood: setGood,
    setNeutral: setNeutral,
    setBad: setBad
  };

  return (
    <div>
      <Feedback clickCounts={clickCounts} eventHandlers={eventHandlers} />
      <Statistics clickCounts={clickCounts} />
    </div>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root')
);