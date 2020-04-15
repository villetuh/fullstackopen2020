import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
  <h1>{props.courseName}</h1>
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
  let numberOfExercises = props.parts.map(part => part.exercises).reduce((a, b) => a + b, 0);
  return (
  <p>Number of exercises {numberOfExercises}</p>
  )
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  };
  
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));