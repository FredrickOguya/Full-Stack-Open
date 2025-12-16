let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const express = require('express')
const morgan = require('morgan')
const app = express();

app.use(morgan('tiny'))
app.use(express.json());
app.use(morgan(':method : url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', (req)=> {
  return req.method === 'POST' ? JSON.stringify(req.body): '';
})

app.get('/api/persons',(request,response) => {
  response.json(persons)
})

app.get('/api/persons/:id',(request,response)=> {
  const id = request.params.id;
  
  const person = persons.find(n=> n.id === id);
  if(person){
    response.send(person)
  } else {
    response.status(404).end();
  }
  
})

app.get('/info',(request,response)=> {
  const curentTime = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><br/> ${curentTime}`);
})

app.delete('/api/persons/:id',(request,response)=>{
  const id = request.params.id;
  const deletePerson = persons.find(n=> n.id === id);

  persons = persons.filter(person=> person.id !== deletePerson.id);
  response.send(persons);
})

app.post('/api/persons',(request,response)=> {
  const id = Math.floor(Math.random() * 100)
  const person = request.body
  if(!person.name || !person.number ){
    return response.status(400).json({
      error: "name and number must have values"
    })
  }else if(persons.find(p => p.name === person.name)){
    return response.status(400).json({
      error: "name must be unique"
    })
  }else{
    person.id = String(id);
    response.json(person);
  }
})

const PORT = 3001;

app.listen(PORT, ()=> {
  console.log(`app listening on port ${PORT}`)
})

