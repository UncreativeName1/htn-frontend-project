import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div>
            <MainNavigation user={props.user} isAdmin={props.isAdmin} logout={props.logout}/>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;