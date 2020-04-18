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

  let statistics;
  if (totalClicks === 0) {
    statistics = <div>No feedback given.</div>;
  }
  else {
    statistics = (
      <table>
        <tbody>
          <tr>
            <Statistic label="Good" value={clickCounts.good} />
          </tr>
          <tr>
            <Statistic label="Neutral" value={clickCounts.neutral} />
          </tr>
          <tr>
            <Statistic label="Bad" value={clickCounts.bad} />
          </tr>
          <tr>
            <Statistic label="All" value={totalClicks} />
          </tr>
          <tr>
            <Statistic label="Average" value={isNaN(averageClickValue) ? "-" : Math.round(averageClickValue * 1000) / 1000} />
          </tr>
          <tr>
            <Statistic label="Positive %" value={isNaN(percentageOfPositive) ? "-" : Math.round(percentageOfPositive * 10) / 10} />
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      {statistics}
    </div>
  );
};

const Statistic = ({label, value}) => (
  <>
    <td>{label}:</td><td>{value}</td>
  </>
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