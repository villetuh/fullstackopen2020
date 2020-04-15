import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
  <h1>{props.course}</h1>
  )
};

const Content = (props) => {
  return (
    <>
    {props.parts.map(part => (
      <Part part={part} key={part.name} />
    ))}
    </>
  )
};

const Part = (props) => {
  return (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
  <p>Number of exercises {props.numberOfExercises}</p>
  )
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ];
  
  let numberOfExercises = parts.map(part => part.exercises).reduce((a, b) => a + b, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total numberOfExercises={numberOfExercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));