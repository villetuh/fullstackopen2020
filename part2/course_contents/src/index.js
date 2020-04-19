import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
};

const Header = ({text}) => {
  return (
  <h1>{text}</h1>
  )
};

const Content = ({parts}) => {
  return (
    <>
    {parts.map(part => (
      <Part part={part} key={part.id} />
    ))}
    </>
  )
};

const Part = ({part}) => {
  return (
    <p>
        {part.name} {part.exercises}
    </p>
  );
};

const Total = ({parts}) => {
  let numberOfExercises = parts.map(part => part.exercises).reduce((a, b) => a + b, 0);
  return (
  <p>Number of exercises {numberOfExercises}</p>
  )
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { id: 1, name: 'Fundamentals of React', exercises: 10 },
      { id: 2, name: 'Using props to pass data', exercises: 7 },
      { id: 3, name: 'State of a component', exercises: 14 }
    ]
  };
  
  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));