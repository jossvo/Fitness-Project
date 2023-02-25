import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import WorkoutDetails from "./workoutDetail"


const Detail = () => {
    const { element, id } = useParams();
    const { store, actions } = useContext(Context);
    const [elementData, setElementData] = useState(null);


    useEffect(() => {
        async function getData() {
            setElementData(await actions.getDetail(element, id));
        }
        getData();
    }, [id]);

function renderDetail(type) {
        if (elementData == null) return "";
        else return <WorkoutDetails element={elementData} /> 
    
    }

    return elementData == null ? <h2>{element} item not found </h2> :
        <div className="card card-detail">
            <img className="card-img-top" src={imageCard} onError={errorImage} alt="Workout" style={{ width: 300 }} />
            <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <div className="card-text card-info">{renderDetail(element)}</div>
            </div>
        </div >
};

export default Detail;
