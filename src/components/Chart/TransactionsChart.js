// 
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns'; // Assuming you've installed date-fns for date formatting

const TransactionsChart = ({ data }) => {
    const [processedData, setProcessedData] = useState([]);

    useEffect(() => {
        const withdrawalsByDay = aggregateWithdrawalsByDay(data);
        const chartData = Object.keys(withdrawalsByDay).map(date => ({
            date,
            withdrawals: withdrawalsByDay[date],
        }));
        setProcessedData(chartData);
    }, [data]);

    const aggregateWithdrawalsByDay = data => {
        return data.reduce((acc, { vendDate, vendQty }) => {
            const date = format(new Date(vendDate), 'PPP'); // 'PPP' for pretty print date format
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += vendQty; // Accumulate withdrawals
            return acc;
        }, {});
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2>Daily Withdrawals Over Time</h2>
            <ResponsiveContainer>
                <LineChart
                    data={processedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} items withdrawn`, 'Daily Withdrawals']} />
                    <Legend />
                    <Line type="monotone" dataKey="withdrawals" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionsChart;
