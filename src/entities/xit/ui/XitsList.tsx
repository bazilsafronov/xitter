import {useSelector} from "react-redux";
import {selectAllXits} from "../model/selectors";
import XitCard from "./XitCard";


export default function XitsList (){
    const xits = useSelector(selectAllXits);
    return(
        <div>
            {xits.map((xit) => (
                <XitCard key={xit.id} xit={xit} />
            ))}
        </div>
    )
}