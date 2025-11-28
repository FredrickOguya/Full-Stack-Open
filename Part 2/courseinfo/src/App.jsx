const App = () => {
  const Course = ({course}) => {
    const Header = ({course}) => {
      return (
        <h1>{course.name}</h1>
      )
    }

    const Content = ({course}) => {
      const Part = ({part}) => {
        return (
          <p>{part.name} {part.exercises}</p>
        )
      }
      return (
        <div>
          <ul>
            {course.parts.map(part => 
              <li key={part.id}>
                <Part part={part}/>
              </li>

          )}
          </ul>
          <Total course={course}/>
          
        </div>
      )
    }

    const Total = ({course}) => {
      const total =  course.parts.reduce((acc,part) => acc + part.exercises,0)
      return (
        <p><b>Total of {total} exercises</b></p>
      )
    }
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
      </div>
    )
  }
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App