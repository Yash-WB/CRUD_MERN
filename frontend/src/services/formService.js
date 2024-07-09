const API_url = 'http://localhost:4000/api/form';

const createForm = async(formData) =>{
    const response = await fetch(`${API_url}/add`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    return response.json();
}

const getForms = async() =>{
    const response = await fetch(API_url)
    return response.json();
}

const updateForm = async(id, formData) =>{
    const response = await fetch(`${API_url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    return response.json();
}

const deleteForm = async(id) =>{
    const response = await fetch(`${API_url}/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}

export default{
    createForm, getForms, updateForm, deleteForm
};