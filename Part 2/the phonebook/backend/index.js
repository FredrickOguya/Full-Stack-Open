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
const app = express();

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

const PORT = 3001;

app.listen(PORT, ()=> {
  console.log(`app listening on port ${PORT}`)
})

