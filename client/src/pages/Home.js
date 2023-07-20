import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/Home.css";

export default function Home() {
    const [seances, setSeances] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        let allFilms;

        axios.get('http://127.0.0.1:8000/movies/')
            .then(response => {
                allFilms = response.data;
                return axios.get('http://127.0.0.1:8000/sessions/');
            })
            .then(response => {
                const sessionCounts = response.data.reduce((counts, seance) => {
                    counts[seance.filmId] = (counts[seance.filmId] || 0) + 1;
                    return counts;
                }, {});

                const validFilms = allFilms.filter(film => sessionCounts[film.id] > 0)
                    .map(film => ({ ...film, sessionCount: sessionCounts[film.id] }));

                setFilms(validFilms);
            })
            .catch(error => {
                console.error('Failed to fetch film data:', error);
            });
    }, []);


    if (films.length > 0) {
        return (
            <div className='content'>
                <h1>Liste des séances</h1>
                <div className='content-main'>
                    <ul>
                        {films.map((film, index) => (
                            <a href={`/seance/${film.id}`}>
                                <div key={film.id} className="movie_card">
                                    <div className="info_section">
                                        <div className="movie_header">
                                            <img className="locandina" src={film.image} />
                                            <h1>{film.name}</h1>
                                            <h4>{film.year}, {film.realisator}</h4>
                                            <span className="minutes">{film.duration} min</span>
                                            <p className="type">
                                                {film.sessionCount} séance(s)
                                            </p>
                                        </div>
                                        <div className="movie_desc">
                                            <p className="text">
                                                {film.synopsis}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="blur_back" style={{ backgroundImage: `url(${film.image})` }}></div>
                                </div>
                            </a>
                        ))}
                    </ul>
                </div >
            </div >
        );
    }

};
