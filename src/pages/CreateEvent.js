import RestrictedPage from "./RestrictedPage";
import CreateEventCard from "../components/event/CreateEventCard";

function CreateEvent(props) {
    if (!props.isAdmin) {
        return <RestrictedPage />
    }

    function onAddEvent(event) {
        props.addEvent(event);
    } 

    return (
        <section>
            <h2>Create an Event</h2>
            <CreateEventCard addEvent={onAddEvent} events={props.events} />
        </section>
    );
}

export default CreateEvent;