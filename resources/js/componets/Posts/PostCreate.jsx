import {useEffect, useState} from "react";
import CategoriesService from "../../services/CategoriesService";
import { useNavigate } from 'react-router-dom';
import APIClient from "../../services/ApiClient";

const apiClient = new APIClient();

const  PostCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: ''
    });
    const [categories, setCategories ] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = () => {
       CategoriesService.getAll()
            .then((response) => {
                setCategories(response.data.data)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isLoading) return;
        
        setIsLoading(true)
        setErrors({});
        APIClient.post('/posts', formData)
            .then(res => {
                navigate('/')
            })
            .catch(e => {
                setErrors(e.response.data.errors)})
            .finally(() => setIsLoading(false))

    }

    useEffect(fetchCategories, []);

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="title" className="block font-medium text-sm text-gray-700">
                        Title
                    </label>
                    <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value })} id="title" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    <div className="text-red-600 mt-1">
                        { errors.title?.map((error, index) => <span key={error.index}>{error}</span>)}
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="content" className="block font-medium text-sm text-gray-700">
                        Content
                    </label>
                    <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value })} id="content" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    <div className="text-red-600 mt-1">
                    { errors.content?.map((error, index) => <span key={error.index}>{error}</span>)}
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="category" className="block font-medium text-sm text-gray-700">
                        Category
                    </label>
                    <select value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value })} id="category" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="" >Select Category</option>
                        {categories.length && categories.map((category) =>  <option value={category.id} key={category.id}>{category.name}</option>)}
                    </select>
                    <div className="text-red-600 mt-1">
                    { errors.category_id?.map((error, index) => <span key={error.index}>{error}</span>)}
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 rounded">
                        {!isLoading ? 'Save' : 'Loading..' }
                    </button>
                </div>
            </form>
        </>

    )
}

export  default PostCreate;
