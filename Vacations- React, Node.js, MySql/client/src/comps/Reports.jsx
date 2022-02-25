import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
Chart.register(...registerables);
export default function Reports() {
    const [follows, setFollows] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1000/vacations/reports', {
                credentials: 'include'
            })
            const data = await res.json()
            if (data.err) {
                navigate("/login")
                return 
            }
            setFollows(Object.entries(data.numberOfFollows))
        })()
    })
    return <div className='chartDiv'>
        {
            follows.length !== 0 ?
                <Bar
                    className='chart'
                    data={{
                        labels: follows.map(v => v[0]),
                        datasets: [
                            {
                                label: 'Follows',
                                data: follows.map(e => e[1]),
                                backgroundColor: "rgba(255, 159, 64, 0.2)",
                                borderColor: "rgb(255, 159, 64)",
                                borderWidth: 1,
                                maxBarThickness: 100,
                                
                            }
                        ],
                    }}
                    options={{
                        scales: {
                          y : {
                                ticks: {
                                    precision: 0,
                                    stepSize: 1
                                }
                            }
                        }
                    }}
                    
                    
                    width={3}
                    height={1}
                    
                />
                :
                <h3 className='noOne'>No one has followed any vacation.</h3>
        }
    </div>;
}
