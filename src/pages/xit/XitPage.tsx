import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectXitById} from "../../entities/xit/model/selectors";
import XitCard from "../../entities/xit/ui/XitCard";


export default function XitPage (){
    const { id } = useParams<{ id: string }>();

    if(!id){
        return(
            <h2 className="p-4 text-gray-600">Хит не найден 😢</h2>
        );
    }
    const xit = useSelector(selectXitById(id));

    if(!xit){
        return <h2 className="p-4 text-gray-600">Хит не найден 😢</h2>
    }

    return (
        <XitCard xit={xit} />
    )
}