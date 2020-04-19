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
  let numberOfExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
  <p><strong>Total number of exercises: {numberOfExercises}</strong></p>
  )
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        { name: 'Fundamentals of React', id: 1, exercises: 10 },
        { name: 'Using props to pass data', id: 2, exercises: 7 },
        { name: 'State of a component', id: 3, exercises: 14 }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        { name: 'Routing', id: 1, exercises: 3 },
        { name: 'Middlewares', id: 2, exercises: 7 }
      ]
    }
  ];
  
  return (
    <div>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));