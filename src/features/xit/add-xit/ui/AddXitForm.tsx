import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createXit} from "../../../../entities/xit/model/slice"
import {selectCurrentUser} from "../../../../entities/user";
import {useNavigate} from "react-router-dom";

interface AddXitModaProps {
    isOpen: boolean;
    onClose: () => void;
}
const AddXitForm = ({isOpen, onClose }: AddXitModaProps) => {
    const [text, setText] = useState('');
    const currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSubmit = (evnt: React.FormEvent) => {
        evnt.preventDefault();
        if(!currentUser || !text.trim()) return;

        dispatch(createXit({ text, authorId: currentUser.uid }));
        setText('');
        onClose();
        navigate('/');
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-end md:items-start justify-center p-4 z-50">
            <div className="bg-white rounded-t-2xl md:rounded-xl w-full max-w-md md:mt-20">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Новый хит</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
          <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Что нового?"
              className="w-full p-2 text-lg border-none outline-none resize-none"
              rows={4}
          />
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">{text.length}/280</div>
                        <button
                            type="submit"
                            disabled={!text.trim()}
                            className="px-4 py-1.5 bg-blue-500 text-white rounded-full font-bold disabled:opacity-50"
                        >
                            Отправить хит
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddXitForm;