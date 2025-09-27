import {useSelector} from "react-redux";
import {selectAllXits} from "../entities/xit/model/selectors";
import XitCard from "../entities/xit/ui/XitCard";
import {Link, useParams} from "react-router-dom";
import AddXitForm from "../features/xit/add-xit/ui/AddXitForm";
import {selectIsAuthenticated} from "../entities/user";


export default function FeedPage () {
    const xits = useSelector(selectAllXits);
    const isAuth = useSelector(selectIsAuthenticated);
    return (
        <div>
            {xits.map((xit) => (
               <Link key={xit.id} to={`/xit/${xit.id}`}>
                   <XitCard xit={xit}/>
               </Link>
            ))}
        </div>
    )
}