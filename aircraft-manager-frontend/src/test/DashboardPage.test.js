import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AircraftTable from '../components/AircraftTable';
import AirportTable from '../components/AirportTable';
import MovementTable from '../components/MovementTable';
import { Box, Heading } from '@chakra-ui/react';

function DashboardPage() {
    return (
        <Router>
            <Box>
                <Heading as="h1" size="xl" textAlign="center" mb="4">Dashboard</Heading>
                <nav>
                    <Link to="/aircraft">Aircraft Table</Link> | 
                    <Link to="/airports">Airport Table</Link> | 
                    <Link to="/movements">Movement Table</Link>
                </nav>
                <Switch>
                    <Route path="/aircraft">
                        <AircraftTable />
                    </Route>
                    <Route path="/airports">
                        <AirportTable />
                    </Route>
                    <Route path="/movements">
                        <MovementTable />
                    </Route>
                </Switch>
            </Box>
        </Router>
    );
}

export default DashboardPage;