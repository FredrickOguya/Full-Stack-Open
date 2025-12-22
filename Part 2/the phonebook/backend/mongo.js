
const mongoose = require('mongoose');

if(process.argv.length<3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://onyangofredrickoguya:${password}@cluster0.hxovx14.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false);

mongoose.connect(url, {family: 4});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema);

if(process.argv.length === 3){
  person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
  name: name,
  number: number
})

person.save().then(result => {
  console.log(`added ${name} number 0${number} to phonebook`)
})
}

