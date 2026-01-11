let persons = [];

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://onyangofredrickoguya:${password}@cluster0.hxovx14.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery',false);
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})
personSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema);

const app = express();

app.use(morgan('tiny'))
app.use(express.json());
app.use(morgan(':method : url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', (req)=> {
  return req.method === 'POST' ? JSON.stringify(req.body): '';
})

app.get('/api/persons',(request,response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id',(request,response)=> {
  Person.findById(request.params.id)
  .then(person => {
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => response.status(404).send({error: "error in id"}))
})

app.get('/info',(request,response)=> {
  const curentTime = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><br/> ${curentTime}`);
})

app.delete('/api/persons/:id',(request,response)=>{
  const id = request.params.id;

  if (id === 'undefined'){
  return response.status(400).send({error: 'id is not defined'})
  }
  Person.findByIdAndDelete(id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({error: 'wrong id'})
  })
})

app.post('/api/persons',(request,response)=> {
  const body = request.body
  if(!body.name || !body.number){
    return response.status(400).json({error: 'name or number missing'})
  }
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> {
  console.log(`app listening on port ${PORT}`)
})

