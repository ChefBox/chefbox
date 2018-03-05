

/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as ProductDetail} from './Product/ProductDetail'
export {default as ProductEdit} from './Product/ProductEdit'
// export {default as ProductCreate} from './Product/ProductCreate'
export {default as AllCategories} from './Category/AllCategories';
export {default as CategoryCreate} from './Category/CategoryCreate'
export {default as RemoveCategory} from './Category/RemoveCategory'
export {default as Cart} from './cart'
export {default as ProductList} from './Product/ProductList'
export {default as ProductItem} from './Product/ProductItem'
