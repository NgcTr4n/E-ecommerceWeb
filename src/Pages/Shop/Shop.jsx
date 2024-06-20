import React, {useState} from 'react'
import CommonSection from '../../Components/UI/CommonSection'
import Helmet from '../../Components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'

// import products from '../../assets/data/products'
// import ProductsList from '../../Components/UI/ProductsList'
import '../Shop/Shop.css'
import { IoIosSearch } from "react-icons/io";
import useGetData from '../../custom-hook/useGetData'
import ProductCart from '../../Components/UI/ProductCart'


const Shop = () => {

  const { data: productsData } = useGetData('products');
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("")



  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const sortedProducts = productsData
  .filter(item => {
    if (selectedCategory === "all" && selectedCategory === "" && searchTerm === "") return true
    if (selectedCategory !== "all" && selectedCategory !== "" && item.category !== selectedCategory) return false
    if (searchTerm !== "" && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return item
  })
  .slice()
  .sort((a, b) => {
    if (sortBy === "ascending") {
      return a.price - b.price
    } else if (sortBy === "descending") {
      return b.price - a.price
    } else {
      return 0
    }
  })

  return <Helmet title={'Shop'}>
      <CommonSection title='Products'/>

      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter_widget">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="all">All</option>
                  <option value="iphone">Iphone</option>
                  <option value="macbook">Macbook</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='12'>
            <div className="filter_widget">
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="">Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>

           

            <Col lg='6' md='6'>
              <div className='search__box'>
                <input type="text" placeholder='Search......' class="search__input" value={searchTerm} onChange={(e) =>setSearchTerm(e.target.value)} />
                <IoIosSearch />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
        <Row>
            {sortedProducts.map((item) => (
              <ProductCart key={item.id} item={item} />
            ))}
          </Row>
        </Container>
      </section>

  </Helmet>
}

export default Shop