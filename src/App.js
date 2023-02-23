import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import CreateEvent from './pages/CreateEvent';
import Layout from './components/ui/Layout';

function App() {
    const [user, setUser] = useState();
    const [isAdmin, setAdmin] = useState();
    const [isLoading, setIsLoading] = useState();
    const [loadedEvents, setLoadedEvents] = useState([]);

    // get request
    useEffect(() => {
        setIsLoading(true);
        fetch('https://api.hackthenorth.com/v3/events')
            .then((response) => {
                return response.json();
            })
            .then((events) => {
                setIsLoading(false);
                setLoadedEvents(events);
            })
    }, [])

    if (isLoading) {
        return (
          <section>
            <p>Loading...</p>
          </section>
        );
    }

    function authUser(username) {
      setUser(username);
    }

    function authAdmin(set) {
      setAdmin(set);
    }

    function logout() {
        setUser(null);
        setAdmin(false);
    }

    function addEvent(event) {
        let tempEvents = loadedEvents;
        tempEvents.push(event);
        setLoadedEvents(tempEvents);
    }
    
    // passing info through props of components
    return (
        <div>
            <Layout user={user} isAdmin={isAdmin} logout={logout}>
                <Routes>
                    <Route path='/' element={<MainPage user={user} isAdmin={isAdmin} events={loadedEvents} />} />
                    <Route path='/login' element={<LoginPage onLogin={authUser} setAdmin={authAdmin} user={user} isAdmin={isAdmin} />} />
                    <Route path='/create-event' element={<CreateEvent user={user} isAdmin={isAdmin} events={loadedEvents} addEvent={addEvent}/>} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;

