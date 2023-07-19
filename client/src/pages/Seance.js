import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function Seance() {

    const { id } = useParams();
    const [seance, setSeance] = useState();

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/sessions/${id}/`)
            .then(response => {
                setSeance(response.data);
            });
    }, []);

    return (
        <div className='content'>
            {seance.name}
        </div>
    );
};
