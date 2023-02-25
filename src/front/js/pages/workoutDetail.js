import React from "react";

const WorkoutDetails = (props) => {

    return <ul className="list-element">
        <li><span>Name: </span>{props.element.properties.name}</li>
        <li><span>Days Per Week: </span>{props.element.properties.days_per_week}</li>
        <li><span>Description: </span>{props.element.properties.description}</li>
        <li><span>Exercise Count: </span>{props.element.properties.excercise_count}</li>
        <li><span>Weeks: </span>{props.element.properties.weeks}</li>
        <li><span>Difficulty: </span>{props.element.properties.difficulty}</li>
    </ul>
};

export default WorkoutDetails
