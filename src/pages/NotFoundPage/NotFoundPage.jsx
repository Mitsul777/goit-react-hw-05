import css from './NotFoundPage.module.css'
import {Link} from "react-router-dom";
const NotFoundPage = () => {
    return (
        <div className={css.notFound}>
            <p>Sorry, the page was not found try to reload the page or
            </p>
            <Link to='/'
            className={css.btn}
            >click to go to the main page
            </Link>
        </div>
    )
}
export default NotFoundPage