import axios from 'axios'

const baseUrl = 'api/persons'

const getContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContacts = (newObject) => {
    console.log(newObject)
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
        .then(response => console.log(response))
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