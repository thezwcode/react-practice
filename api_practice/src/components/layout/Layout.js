import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';


const Layout = (props) => {
    return(
    <><MainNavigation/>
    <div className={classes.main}>{props.children}</div></> 
    )   
}

export default Layout;