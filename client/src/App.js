import React, { useEffect, useState, useRef } from 'react';
import TypeInput from './typeInput';
import './App.css'
function App() {
    const [backendData, setBackendData] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        cost: '',
        item: '',
        desc: '',
    });
    const costInputRef = useRef('');
    const itemInputRef = useRef('');

    useEffect(() => {
        fetch("/api").then(res => res.json()).then(data => {
            setBackendData(data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(() => {
            fetch("/api").then(res => res.json()).then(data => {
                setBackendData(data);
                setFormData({
                    type: '',
                    cost: '',
                    item: '',
                    desc: '',
                });
            });
        });
    };

    const getAverage = () => {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const expensesLast7Days = backendData.filter(expense => new Date(expense.date) >= sevenDaysAgo);
        const totalCostLast7Days = expensesLast7Days.reduce((total, expense) => total + parseInt(expense.cost), 0);
        const averageCostLast7Days = totalCostLast7Days / 7;
        return averageCostLast7Days.toFixed(2); // Return the average cost with 2 decimal places
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className='app'>
            <TypeInput
                itemInputRef={itemInputRef}
                costInputRef={costInputRef}
                onUpdate={({ type, item }) => setFormData({ ...formData, type, item })}
            />
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='type'
                    placeholder='分類'
                    autoComplete='off'
                    required
                    value={formData.type}
                    onChange={handleChange}
                />
                <input
                    ref={itemInputRef}
                    type='text'
                    name='item'
                    placeholder='類型'
                    autoComplete='off'
                    value={formData.item}
                    onChange={handleChange}
                />
                <input
                    ref={costInputRef}
                    type='number'
                    name='cost'
                    placeholder='價格'
                    autoComplete='off'
                    required
                    value={formData.cost}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='desc'
                    placeholder='備註'
                    autoComplete='off'
                    value={formData.desc}
                    onChange={handleChange}
                />
                <button className='submit' type='submit'>送出</button>
            </form>
            <hr></hr>
            <div className='summary'>
                <p>Total: $ {backendData.reduce((total, item) => {
                    return parseInt(total) + parseInt(item.cost)
                }, 0)}</p>
                <p>Average(7Days): $ {getAverage()}</p>
            </div>
            <hr></hr>
            <div>
                <table className='table'>
                    <tbody>
                        {backendData.map((item, index) => (
                            <tr>
                                <td>{item.date}</td>
                                <td>{item.type}</td>
                                <td>${item.cost}</td>
                                <td>{item.item}</td>
                                <td>{item.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
