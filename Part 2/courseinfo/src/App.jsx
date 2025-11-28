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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div>
    {courses.map(course => (
      <Course course={course} key={course.id} />
    ))}
    
  </div>
  )
}

export default App