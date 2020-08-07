import React, { useState } from 'react'
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import Category from '../Components/Admin/Category';
import NewQuestion from '../Components/Admin/NewQuestion';
import AnswerOptions from '../Components/Admin/AnswerOptions';
import CorrectAnswer from '../Components/Admin/CorrectAnswer';

const Admin = ({ dataCategories, isError, isLoading }) => {

    const [addCategory, setAddCategory] = useState(false);
    const [categoryForm, setCategoryForm] = useState({});
    const [categoryMessage, setCategoryMessage] = useState("");
    const [message, setMessage] = useState("");
    const [question, setQuestion] = useState({});
    const [options, setOptions] = useState({});
    const [answer, setAnswer] = useState({});
    const [categoryId, setCategoryId] = useState(null);


    const handleCategory = (e) => {
        const { name, value } = e.target;
        setCategoryForm({ ...categoryForm, [name]: value });
    };


    const add = () => {

        Axios
            .post("https://5f280f4ef5d27e001612ea88.mockapi.io/categories", categoryForm)
            .then((response) => {
                console.log(response);
                setCategoryMessage("La categoría se agregó con éxito!");

            })
            .catch(error => {
                console.log(error.response);
                setCategoryMessage("Ocurrió un error");
            })

    };


    const addQuestion = () => {

        const form = {
            question,
            answer,
            options: {
                ...options,
            }
        };

        Axios
            .post(`https://5f280f4ef5d27e001612ea88.mockapi.io/categories/${categoryId}/questions`, form)
            .then(response => {
                console.log(response);
                setMessage("La pregunta se cargó con éxito!")
            })
            .catch(error => {
                console.log(error.response);
                setMessage("Ocurrió un error");
            })

        console.log('completo', form);
        // console.log(`question`, question);
        // console.log(`options`, options);
        // console.log(`answer`, answer);
        // console.log(`Category`, categoryId);
    }



    const renderInputNewCategory = () => {
        if (addCategory) {
            return (
                <div className="mt-4 admin-new-category">

                    <label htmlFor="" >Ingrese Nueva Categoría</label>
                    <input type="text" name="name" className="admin-input" placeholder="Ej: Química" onChange={handleCategory} />

                    <label htmlFor="" >Ingrese Img URL</label>
                    <input type="text" name="img" className="admin-input" onChange={handleCategory} />

                    <label htmlFor="" >Cantidad de preguntas</label>
                    <input type="number" name="questions" className="admin-input" onChange={handleCategory} />

                    <p className="admin-message">{categoryMessage}</p>

                    <button className="btn admin-btn-category" onClick={add} >Agregar</button>

                </div>
            )
        }
    }

    return (
        <>
            {isError && (
                <div className="alert alert-danger mt-3" role="alert">
                    Error 404: Not Found.
                    API error: There was an error please refresh the page and try again.
                </div>
            )}


            {isLoading && (
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            )}


            {dataCategories && !isLoading && !isError && (

                <div className="container admin-container mt-3">
                    <h2>Formulario</h2>
                    <p className="quiz-subtitle">Nuevas Preguntas</p>
                    <div className="d-flex flex-column">

                        <Category dataCategories={dataCategories} setAddCategory={setAddCategory} setCategoryId={setCategoryId} renderInputNewCategory={renderInputNewCategory} />

                        <NewQuestion setQuestion={setQuestion} />

                        <AnswerOptions setOptions={setOptions} options={options} />

                        <CorrectAnswer setAnswer={setAnswer} />

                        <p className="admin-message">{message}</p>

                        <button
                            className="btn admin-btn-category admin-btn-category-green mb-4 "
                            onClick={addQuestion}>
                            Agregar
                        </button>

                    </div>
                </div>

            )}

        </>
    )

}

Admin.propTypes = {
    dataCategories: PropTypes.array,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    setIsError: PropTypes.func,
    setIsLoading: PropTypes.func
}

export default Admin
