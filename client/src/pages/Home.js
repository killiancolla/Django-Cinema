import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [seances, setSeances] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/sessions/')
            .then(response => {
                console.log(response.data);
                setSeances(response.data);
            });
    }, []);

    return (
        <div className='content'>
            <h1>Liste des séances</h1>
            <div className='content-main'>
                <ul>
                    {seances.map(seance => (
                        <Link key={seance.id} to={`/seance/${seance.id}`}>
                            <li>{seance.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};
