import { useEffect, useState } from "react";
import Product from "./Product";

const ProductList = ()=>{

    const [productList, setProductList] = useState([])
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    const getProducts = ()=>{
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(response => setProductList(response))
    }

    const getCategories = ()=>{
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(response => setCategories(response))
    }

    useEffect(()=>{
        getProducts()
        getCategories()
    }, [])

    const displayProducts = ()=>{
        let myProducts = productList.filter(x=>x.id.toString().includes(search) || x.title.includes(search) || x.description.includes(search))
        if(category){
            myProducts = myProducts.filter(x=>x.category === category)
        }
        if(myProducts.length > 0){
            return myProducts.map((x, key)=>
                <Product product={x} key={key}/>
            )
        }
        return <tr><td className="text-center" colSpan={6}>No Items</td></tr>
    }

    const displayCategories = ()=>{
        return categories.map(x=><button name={x} onClick={(e)=>handleCategory(e)} className="btn btn-secondary">{x}</button>)
    }

    const handleCategory = (x)=>{
        setCategory(x.target.name)
    }
    const handleSearch = (e)=>{
        e.preventDefault()
        const value = document.querySelector("#search").value
        setSearch(value)
    }

    return(
        <div className="container mx-auto w-75 my-3">
            <h1>Search:</h1>
            <br/>
            <form className="d-flex" onSubmit={(e)=>handleSearch(e)}>
                <input type="text" className="form-control w-25" id="search" placeholder="search"/>
                <input type="submit" class="btn btn-primary" value="Search"/>
            </form>
            <br/>
            <h1>Products List : </h1>
            <div className="btn-group w-100 my-5">
                {displayCategories()}
            </div>
            <table className="table">
                <tr>
                    <th>ID</th>
                    <th>title</th>
                    <th>price</th>
                    <th>category</th>
                    <th>description</th>
                    <th>image</th>
                </tr>
                {displayProducts()}
            </table>
        </div>
    )
}
export default ProductList;