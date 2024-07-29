const Product = ({product})=>{
    return(
        <tr>
            <th>{product.id}</th>
            <th>{product.title}</th>
            <th>{product.price}</th>
            <th>{product.category}</th>
            <th>{product.description}</th>
            <th><img src={product.image} alt={product.title} width={200}/></th>
        </tr>
    )
}
export default Product