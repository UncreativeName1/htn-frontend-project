import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation(props) {
    return (
        <div>
        <header className={classes.header}>
            <nav>
                <ul>
                    <li className={classes.title}>
                        <Link to='/'>Hack The North</Link>
                    </li>
                    <li>
                        <Link to='/'>Events Page</Link>
                    </li>
                    <li>
                        {props.isAdmin && <Link to='/create-event'>Create Event</Link>}
                    </li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li className={classes.welcome}>
                        {props.user && <h3>Welcome, {props.user}</h3>}
                    </li>
                    <li className={classes.login}>
                        {props.user ? <Link onClick={props.logout} to='/'>Logout</Link> : <Link to='/login'>Login</Link>}
                    </li>
                </ul>
            </nav>
        </header>
        </div>
    );
}


export default MainNavigation;
