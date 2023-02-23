import { useRef, useState, useEffect } from 'react';

import classes from './CreateEventCard.module.css';
import CardItem from '../card-ui/CardItem';
import DynamicField from '../ui/DynamicField';
import Select from 'react-dropdown-select';

// Constant event types & permission types
const eventTypes = [
    {name: "workshop"}, 
    {name: "activity"}, 
    {name: "tech_talk"}
];
const permissionTypes = [
    {name: "public"}, 
    {name: "private"}
];

// smallest positive integer not in array
function smallestPositive(arr) {
    const seen = new Map();
  
    for (let i = 0; i < arr.length; i++) {
      seen.set(arr[i]);
    }
  
    for (let i = 1; i <= arr.length + 1; i++) {
      if (!seen.has(i)) return i;
    }
  
    return 1;
}

// component for creating a new event
function CreateEventCard(props) {
    // temporarily store the event in this obj
    let eventData = useRef({
        id: null,
        name: null,
        event_type: null,
        permission: null,
        start_time: null,
        end_time: null,
        description: null,
        speakers: null,
        public_url: null,
        private_url: null,
        related_events: null
    });

    // elements: {id: id, name: name}
    // used for display in dropdown
    const [nameIDs, setNameIDs] = useState([]);

    // when the events changes, we update the name & id's
    useEffect(() => {
        let tempNameIDs = [];
        for (const event of props.events) {
            const obj = {
                id: event.id,
                name: event.name
            };
            tempNameIDs.push(obj);
        }
        setNameIDs(tempNameIDs);
    }, [props.events]);

    function submitHandler(event) {
        event.preventDefault();
        // get smallest unused id
        eventData.current.id = smallestPositive(props.events.map((ev) => {return ev.id}));
        eventData.current.speakers = eventData.current.speakers.map((sp) => {return {name: sp}});
        const tempData = eventData.current;
        props.addEvent(tempData);
    }

    return (
        <CardItem>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='event_name'>Event Name</label>
                <input type='text' required id='title' onChange={(event) => {eventData.current.name = event.target.value}} />
            </div>
            <div className={classes.custom}>
                <label htmlFor='event_type'>Event Type</label>
                <Select required options={eventTypes} labelField='name' valueField='name' onChange={(value) => {eventData.current.event_type = value[0].name}} />
            </div>
            <div className={classes.custom}>
                <label htmlFor='permission'>Permission</label>
                <Select required options={permissionTypes} labelField='name' valueField='name' onChange={(value) => {eventData.current.permission = value[0].name}} />
            </div>
            <div className={classes.control}>
                <label htmlFor='start_time'>Time</label>
                <input type='text' required id='start_time' onChange={(event) => {eventData.current.start_time = event.target.value}} />
                to
                <input type='text' required id='end_time' onChange={(event) => {eventData.current.end_time = event.target.value}} />
            </div>
            <div className={classes.control}>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    rows='5'
                    onChange={(event) => {eventData.current.description = event.target.value}}
                ></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor='event_type'>Speakers</label>
                <DynamicField onChange={(speakers) => {eventData.current.speakers = speakers}}/>
            </div>
            <div className={classes.custom}>
                <label htmlFor='related_events'>Related Events</label>
                <Select required multi options={nameIDs} labelField='name' valueField='id' onChange={(value) => {eventData.current.related_events = value.map((ev) => {return ev.id;})}} />
            </div>
            <div className={classes.control}>
                <label htmlFor='image'>Public URL</label>
                <input type='url' id='public_url' onChange={(event) => {eventData.current.public_url = event.target.value}} />
            </div>
            <div className={classes.control}>
                <label htmlFor='image'>Private URL</label>
                <input type='url' id='private_url' onChange={(event) => {eventData.current.private_url = event.target.value}} />
            </div>
            <div className={classes.actions}>
                <button>Add Event</button>
            </div>
        </form>
        </CardItem>
    );
}

export default CreateEventCard;