import classes from './EventItem.module.css';
import CardItem from '../card-ui/CardItem';

// constants for background color of card and display name for event types
const backgroundColors = {
    'workshop': 'rgba(206, 255, 252, 0.8)',
    'activity': 'rgba(207, 255, 206, 0.8)',
    'tech_talk': 'rgba(255, 252, 206, 0.8)'
}
const eventTypeDisplay = {
    'workshop': 'Workshop',
    'activity': 'Activity',
    'tech_talk': 'Tech Talk'
}

const isValidUrl = (urlString) => {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e) { 
        return false; 
    }
}

function EventItem(props) {
    const startTimeDate = new Date(props.start_time);
    const endTimeDate = new Date(props.end_time);

    function setSpeakerDisplay() {
        let str = "", cnt = 0;
        for (const sp of props.speakers) {
            if (cnt) {
                str = str.concat(", ");
            }
            str = str.concat(sp.name);
            cnt++;
        }
        return str;
    }

    function setRelatedEventsDisplay() {
        let eventNames = props.getNamesFromID(props.related_events);
        let str = "", cnt = 0;
        for (const name of eventNames) {
            if (cnt) {
                str = str.concat(", ");
            }
            str = str.concat(name);
            cnt++;
        }
        return str;
    }

    function setLink() {
        if (props.loggedIn && props.permission === 'private' && isValidUrl(props.private_url)) {
            return props.private_url;
        } else if (isValidUrl(props.public_url)){
            return props.public_url;
        } else {
            return null;
        }
    }
    
    // display variables in event card
    let speakerDisplay = setSpeakerDisplay();
    let relatedEventsDisplay = setRelatedEventsDisplay();
    let linkDisplay = setLink();

    return (
        <li className={classes.item}>
            <CardItem color={backgroundColors[props.event_type]}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        {linkDisplay ? <a href={linkDisplay}><h2>{props.name}</h2></a> : <h2>{props.name}</h2>} 
                    </div>
                    <div className={classes.eventType}>
                        <h4>{(props.event_type in eventTypeDisplay) ? eventTypeDisplay[props.event_type] : props.event_type}</h4>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.relatedEvents}>
                        <p>Related Events: {relatedEventsDisplay}</p>
                    </div>
                    <div className={classes.time}>
                        <p>Time: {startTimeDate.toLocaleString()} to {endTimeDate.toLocaleString()}</p>
                    </div>
                    <div className={classes.speakers}>
                        <p>Speakers: {speakerDisplay}</p>
                    </div>
                    <div className={classes.description}>
                        <p>Description: {props.description}</p>
                    </div>
                </div>
            </CardItem>
        </li>
    );
}

export default EventItem;