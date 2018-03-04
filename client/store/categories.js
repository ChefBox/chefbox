import axios from 'axios';


const GET = 'GET_CATEGORY'
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DELETE = 'DELETE_CATEGORY';


const getCategories = (categories) => {
    return {
        type: GET,
        categories
    }
}

const createCategory = (category) => {
    return {
        type: CREATE_CATEGORY,
        category
    }
}

const updateCategory = (category) => {
    return {
        type: UPDATE_CATEGORY,
        category
    }
}

const deleteCategory = (id) => {
    return {
        type: DELETE,
        id
    }
}


export function fetchCategories() {
    return function thunk(dispatch){
        return axios.get('/api/categories')
        .then(res => res.data)
        .then(categories => {
            return dispatch(getCategories(categories))
        })
        .catch(err => console.error('Fetching categories failed', err))
    }
}

export function addCategory(category){
    return function thunk(dispatch){
        return axios.post('/api/categories', category)
        .then(res => res.data)
        .then(newCategory => dispatch(createCategory(newCategory)))
        .catch(err => console.error(`Creating category ${category} unsuccessful`, err))
    }
}

export function editCategory(category, id){
    return function thunk(dispatch){
        return axios.put(`/api/categories/${id}`)
        .then(res => res.data)
        .then(updatedCategory => dispatch(updateCategory(updatedCategory)))
        .catch(err => console.error(`Updating Category ${category} unsuccessful`, err))
    }
}

export function removeCategory(id){
    return function thunk(dispatch){
        console.log(id)
        return axios.delete(`/api/categories/${id}`)
        .then(() => 
        {
            return dispatch(deleteCategory(id))
        })
        .catch(err => console.error(`Failed to delete Category ${id}`, err))
    }
}

export default function reducer(categories = [], action) {
    switch (action.type) {
      case GET:
        return action.categories;
      case CREATE_CATEGORY:
        return [...categories, action.category];
      case UPDATE_CATEGORY:
        return categories.map(category => {
          return category.id === action.id ? action.category : category
        });
      case DELETE:
        return categories.filter(category => {console.log(category) 
        return category.id !== action.id});
      default:
        return categories;
    }
  }
