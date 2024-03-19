import React from 'react';
    
    function DataTable() {
        // 임시 데이터
        const data = [
            { aircraftId: 1, tailNumber: "N12345", location: "LAX", status: "In Flight" },
            { aircraftId: 2, tailNumber: "N67890", location: "JFK", status: "Landed" },
            { aircraftId: 3, tailNumber: "N54321", location: "ORD", status: "Delayed" },
            { aircraftId: 4, tailNumber: "N09876", location: "SFO", status: "On Time" }
        ];
    
        return (
            <table>
                <thead>
                    <tr>
                        <th>Aircraft ID</th>
                        <th>Tail Number</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.aircraftId}</td>
                            <td>{item.tailNumber}</td>
                            <td>{item.location}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

export default DataTable;