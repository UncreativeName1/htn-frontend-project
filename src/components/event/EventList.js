import EventItem from './EventItem';
import classes from './EventList.module.css';
import { useEffect, useState, useCallback } from 'react';

const debug = true;

function EventList(props) {
    const [eventList, setEventList] = useState(props.events);
    // sorts props.events (not in place) by a specified criteria
    const sortBy = useCallback((sortType) => {
        let tempEvents = props.events;
        let sortFunc;
        // sorting types; we use id as a "last resort" if the given values are equal.
        switch (sortType) {
            case "id":
                sortFunc = (ev1, ev2) => {
                    return ev1.id - ev2.id;
                }
                break;
            case "name":
                sortFunc = (ev1, ev2) => {
                    const val = ev1.name.localeCompare(ev2.name);
                    return (val === 0) ? ev1.id - ev2.id : val;
                }
                break;
            case "start_time":
                sortFunc = (ev1, ev2) => {
                    const val = ev1.start_time - ev2.start_time;
                    return (val === 0) ? ev1.id - ev2.id : val;
                }
                break;
            case "end_time":
                sortFunc = (ev1, ev2) => {
                    const val = ev1.end_time - ev2.end_time;
                    return (val === 0) ? ev1.id - ev2.id : val;
                }
                break;
            default:
                return tempEvents;
        }
        tempEvents.sort(sortFunc);
        return tempEvents;
    }, [props.events]);

    // using a list of ids, return the name of the events with those id's
    function getNamesFromID(ids) {
        let names = [];
        let tempEvents = sortBy("id");
        let idIndex = 0;
        for (let eventsIndex = 0; eventsIndex < tempEvents.length;) {
            if (ids[idIndex] === tempEvents[eventsIndex].id) {
                names.push(tempEvents[eventsIndex].name);
                eventsIndex++;
                idIndex++;
            } else if (ids[idIndex] <= tempEvents[eventsIndex].id) {
                idIndex++;
            } else {
                eventsIndex++;
            }
        }
        return names;
    }

    // idea: every time a new list of events comes or a new sort type is requested, we re-sort and then map each of the events into the card ui components.
    useEffect(() => {
        setEventList(sortBy(props.sortType));
        console.log("here");
    }, [props.events, props.sortType, sortBy]);

    return (
        <ul className={classes.list}>
            {console.log("ABOUT TO SET: ", eventList)}
            {eventList.map((eventItem) => (
                (debug || props.loggedIn || eventItem.permission === "public") && <EventItem 
                    key={eventItem.id}
                    id={eventItem.id}
                    name={eventItem.name}
                    event_type={eventItem.event_type}
                    permission={eventItem.permission}
                    start_time={eventItem.start_time}
                    end_time={eventItem.end_time}
                    description={eventItem.description}
                    speakers={eventItem.speakers}
                    public_url={eventItem.public_url}
                    private_url={eventItem.private_url}
                    related_events={eventItem.related_events}
                    getNamesFromID={getNamesFromID}
                    loggedIn={props.loggedIn}
                />
            ))}
        </ul>
    );
}

export default EventList;
