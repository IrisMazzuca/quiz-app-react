import React from 'react'
import { useHistory } from 'react-router-dom'



const Home = ({ setId }) => {
    const history = useHistory();

    return (
        <div className="home-container">
            <h1 className="home-title">QUIZ</h1>
            <p className="home-subtitle">Elige una categoría!</p>
            <button
                className="btn-category math"
                value="1"
                onClick={(e) => {
                    history.push('/quiz');
                    setId(e.target.value);
                }}>
                <p className="category-title">Matemática</p>
            </button >
            <button
                className="btn-category computers"
                value="2"
                onClick={(e) => {
                    history.push('/quiz');
                    setId(e.target.value);
                }}>
                <p className="category-title">Programación</p>
            </button>
            <button
                className="btn-category geography"
                value="3"
                onClick={(e) => {
                    history.push('/quiz');
                    setId(e.target.value);
                }}>
                <p className="category-title">Geografía</p>
            </button>
            <button
                className="btn-category films"
                value="4"
                onClick={(e) => {
                    history.push('/quiz');
                    setId(e.target.value);
                }}>
                <p className="category-title">Cine</p>
            </button>
        </div >
    )
}

export default Home