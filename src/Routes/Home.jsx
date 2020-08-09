import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const Home = ({ dataCategories }) => {


    return (dataCategories && (
        <div className="home-container container">

            <h1 className="home-title">QUIZ</h1>
            <p className="home-subtitle">Elige una categoría!</p>

            {dataCategories.map(category => {
                return (

                    <Link
                        className="home-category"
                        key={category.id}
                        to={`/quiz/${category.id}`}
                        style={{ background: `url(${category.img})`, backgroundSize: 'cover' }}>

                        <p className="home-category-title" > {category.name}</p>

                    </Link>

                )
            })}


        </div >
    ))
}

Home.protoTypes = {
    dataCategories: PropTypes.array
}

export default Home