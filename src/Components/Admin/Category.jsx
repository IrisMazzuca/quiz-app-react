import React from 'react'
import { FaPlusCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Category = ({ dataCategories, setAddCategory, setCategoryId, renderInputNewCategory }) => {
    return (
        <div className="d-flex flex-column">

            <label>Categoría</label>
            <select
                type="text"
                className="admin-input"
                name="categoryId"
                onChange={(e) => {
                    setCategoryId(e.target.value);
                }} >

                <option value="" name="categoryId"></option>

                {dataCategories.map(category => {
                    return (
                        <option
                            key={category.id}
                            name="categoryId"
                            value={category.id}>

                            {category.id}-{category.name}

                        </option>
                    )
                })}
            </select>

            <button
                className="btn admin-btn-category"
                onClick={() => setAddCategory(true)}>
                <FaPlusCircle /> Nueva
            </button>

            {renderInputNewCategory()}

        </div>
    )
}

Category.propTypes = {
    dataCategories: PropTypes.array,
    setAddCategory: PropTypes.func,
    setCategoryId: PropTypes.func,
    renderInputNewCategory: PropTypes.func
}

export default Category
