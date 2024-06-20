import React from 'react';
import { Table } from 'react-bootstrap';

const PopularProgram = () => {
    const data = [
        { rank: 1, name: "Bachelor of commerce", enrolments: 324, visits: 456, completions: 178 },
        { rank: 2, name: "Bachelor of design", enrolments: 324, visits: 456, completions: 178 },
        { rank: 3, name: "Bachelor of arts", enrolments: 324, visits: 456, completions: 178 },
        { rank: 4, name: "Bachelor of education", enrolments: 324, visits: 456, completions: 178 },
        { rank: 5, name: "Ph.D. in biotechnology", enrolments: 324, visits: 456, completions: 178 }
    ];

    return (
        <div className='popularprogram-table'>
            <Table borderless responsive striped className='text-center'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Course Name</th>
                        <th>Enrolments</th>
                        <th>Visits</th>
                        <th>Completions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((program, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f8ff' : '#ffffff' }}>
                            <td>{program.rank}</td>
                            <td className='text-start'>{program.name}</td>
                            <td>{program.enrolments}</td>
                            <td>{program.visits}</td>
                            <td>{program.completions}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PopularProgram;
