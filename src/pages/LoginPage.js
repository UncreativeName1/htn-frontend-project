import CardItem from '../components/card-ui/CardItem';
import classes from './Login.module.css';


const adminUser = ["admin"];
const pass = ["123"];

function LoginPage(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if(pass.includes(e.target.password.value)){
            props.onLogin(e.target.username.value);
        }
        if (adminUser.includes(e.target.username.value)) {
            props.setAdmin(true);
        } else {
            props.setAdmin(false);
        }
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
            </div>
                <CardItem>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.control}>
                        <label>Username: <input type="text" name="username"></input></label>
                    </div>
                    <div className={classes.control}>
                        <label>Password: <input type="text" name="password"></input></label>
                    </div>
                    <button>Submit</button>
                </form>
                </CardItem>
        </div>
    );
}

export default LoginPage;
