import axios from "axios";
import { API_URL } from '@env';


// get contacts
const getContacts = async (page) => {
    let contactsUrl ='';
    if(page){
        contactsUrl = API_URL+'/contacts?page='+page
    }else{
        contactsUrl = API_URL+'/contacts'

    }
    const response = await axios.get(contactsUrl)
    return response.data
}

// get search contacts
const searchContacts = async (query) => {

    const response = await axios.get(API_URL+'/contacts?search='+query)
    return response.data
}
// get contact by id
const getContactById = async (contactId) => {

    const response = await axios.get(API_URL+'/contacts/'+contactId)
    return response.data
}

const contactService = {
    getContacts,
    searchContacts,
    getContactById
}


export default contactService