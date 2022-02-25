import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VacationCard from './VacationCard';

export default function List({ setUpdate, update ,searchInp}) {
    const [vacationsArr, setVacationsArr] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1000/vacations', {
                credentials: 'include'
            })
            const data = await res.json()
            if (data.err) {
               navigate("/login")
               localStorage.removeItem('role')
               localStorage.removeItem('username')
               return
            }
            setVacationsArr(data)
        })()
    }, [update])


    return <div className='list'>
        {
            location.pathname == "/favorites" ?

            vacationsArr.filter(e=> e.isFollowed == 1) == ""?
            <span className='spanF'>Haven't followed any vacation yet? <br /><Link to="/">Follow here </Link>  </span>
            
            :vacationsArr.filter(e=> e.isFollowed == 1 && e.destination.toLowerCase().includes(searchInp.toLowerCase())).map(v => <VacationCard key={v.vacation_id} vacationsArr={vacationsArr} vacation={v} setUpdate={setUpdate} />)
            
            :vacationsArr.filter(e=> e.destination.toLowerCase().includes(searchInp.toLowerCase())).map(v => <VacationCard key={v.vacation_id} vacationsArr={vacationsArr} vacation={v} setUpdate={setUpdate} />)
        }

    </div>;
}
