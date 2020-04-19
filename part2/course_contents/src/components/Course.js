import React from "react";

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

  export default Course