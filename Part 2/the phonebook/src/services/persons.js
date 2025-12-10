import axios from "axios"

const baseurl = 'http://localhost:3001/persons'

const getPersons = () => {
  return axios.get(baseurl);
}

const createPerson = newPerson => {
  return axios.post(baseurl,newPerson);
}

const deletePerson = id => {
  return axios.delete(`${baseurl}/${id}`)
}


export default { getPersons, createPerson, deletePerson }