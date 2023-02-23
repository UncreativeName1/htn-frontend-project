import EventList from '../components/event/EventList';
import Select from 'react-dropdown-select';
import { useState } from 'react';

// options the user has to sort the event cards
const sortOptions = [
    {name: 'ID', option: 'id'},
    {name: 'Name', option: 'name'},
    {name: 'Start Time', option: 'start_time'},
    {name: 'End Time', option: 'end_time'}
];

function MainPage(props) {
    const [sortType, setSortType] = useState('start_time');
    return (
        <div>
            <h1>All Events</h1>
            <p>Sort by...</p>
            <Select options={sortOptions} labelField='name' valueField='option' onChange={(value) => {setSortType(value[0].option)}} />
            <EventList events={props.events} loggedIn={props.user ? true : false} isAdmin={props.isAdmin} sortType={sortType}/>
        </div>
    );
}

export default MainPage;
