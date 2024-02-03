import apiClient from "./ApiClient";

class CategoriesService {
    getAll() {
       return  apiClient.get('/categories')
    }
}

export default new CategoriesService;
