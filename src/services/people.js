import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContacts = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteContacts = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateContacts = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


const contactService = { getContacts, addContacts, deleteContacts, updateContacts }

export default contactService