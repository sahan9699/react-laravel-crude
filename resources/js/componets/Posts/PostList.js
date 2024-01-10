import { useEffect, useState} from "react";
const  PostsList = () => {

    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState({ page: 1, category_id: '', order_column: 'id', order_direction: 'desc'});

   const  fetchPosts = () => {
        axios.get('/api/posts', { params: query } )
        .then(respond => setPosts(respond.data))
   }

   const fetchCategories = () => {
        axios.get('/api/categories')
            .then(respond => setCategories(respond.data))
    }

   const  categoryChanged  = (category_id) => {
       setQuery({page: 1, category_id: category_id});
    }

    const pageChanged = (url) => {
        const fullUrl = new URL(url);
        const page = fullUrl.searchParams.get('page')
        setQuery({...query, page: page})
    }
    const changeColumnOrder = (column) => {
       if(query.order_column == column) {
           setQuery({...query, order_direction: query.order_direction == 'desc' ? 'asc' : 'desc'})
       }else  {
           setQuery({...query, order_column: column, order_direction: 'desc'})
       }

    }

    useEffect(() => {
        fetchPosts();
    },[ query ])

    useEffect(() => {
        fetchCategories();
    }, [])

        if(posts.length === 0) return;

        return (
            <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
                <select onChange={(event) => categoryChanged(event.target.value)} className="form-select mb-4" aria-label="Default select example">
                    <option value='' selected>Open this select menu</option>
                    {categories.data.length !== 0 && categories.data.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <div className="min-w-full align-middle">
                    <table className="table">
                        <thead className="table-header">
                        <tr>
                            <th onClick={() => changeColumnOrder('id')}>
                                <span>ID</span>
                            </th>
                            <th onClick={() => changeColumnOrder('title')}>
                                <span>Title</span>
                            </th>
                            <th onClick={() => changeColumnOrder('content')}>
                                <span>Content</span>
                            </th>
                            <th onClick={() => changeColumnOrder('category')}>
                                <span>Category</span>
                            </th>
                            <th>
                                <span>Created at</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {posts.data.map((post) =>  <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{post.category.name}</td>
                            <td>{post.created_at}</td>
                        </tr>)}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 leading-5">
                                        Showing
                                        <span>
                                <span className="font-medium"> { posts.meta.from } </span>
                                to
                                <span className="font-medium"> { posts.meta.to } </span>
                            </span>
                                        of
                                        <span className="font-medium"> { posts.meta.total } </span>
                                        results
                                    </p>
                                </div>

                                <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                          {posts.meta.links.map((link, index) =>
                              <button key={index} onClick={() => pageChanged(link.url)}
                                      dangerouslySetInnerHTML={{__html: link.label}}
                                      className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"/>
                          )}
                        </span>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
    )
}
export default PostsList
