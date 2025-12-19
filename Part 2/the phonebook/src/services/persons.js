import axios from "axios"

const baseurl = '/api/persons'

const getPersons = () => {
  return axios.get(baseurl);
}

const createPerson = newPerson => {
  return axios.post(baseurl,newPerson);
}

const deletePerson = id => {
  return axios.delete(`${baseurl}/${id}`)
}

const updatePerson = (id,newPerson) => {
  return axios.put(`${baseurl}/${id}`,newPerson)
}


export default { getPersons, createPerson, deletePerson, updatePerson }