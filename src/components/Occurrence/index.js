import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.svg';
import {useState} from "react";
import {useHistory} from "react-router-dom";


const Occurrence = props => {
    const showActions = () => {
        setActions(!actions)
        if(arrow === arrowDown){
            setArrow(arrowUp);
        } else {
            setArrow(arrowDown)
        }
    }
    const [actions, setActions] = useState(false);
    const [arrow, setArrow] = useState(arrowDown);
    const history = useHistory();
    const handleOnClickDetails = () => {
        history.push(`/detalhes/${props.occurrence.id}`)
    }
    return (
        <div className="card">
            <div className="item">
                <div className="number">
                    <h4>{props.occurrence.code}</h4>
                </div>
                <div className="type">
                    <h4>{props.occurrence.type}</h4>
                </div>
                <div className="type">
                    <h4>{props.occurrence.day}</h4>
                </div>
                <div className="type">
                    <h4>{props.occurrence.hour}</h4>
                </div>
                <div className="type">
                    <h4>{props.occurrence.status.name}</h4>
                </div>
                <div className="type">
                    <button onClick={showActions}>
                        <img src={arrow} alt="Seta"/>
                    </button>
                </div>
            </div>
            {
                actions ? (
                    <div className="actions">
                        <hr/>
                        <div>
                            <button onClick={handleOnClickDetails}>Detalhes</button>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export {Occurrence}
