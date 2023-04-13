import React,{useState} from "react";
import './checkbox_radio.css'

const Checkbox_Radio = (props) => {

    const [checked,setChecked] = useState(true)
    const addFilter = (event) => {
        const type =event.target.type 
        if(type==='checkbox'){
            setChecked(!checked)
            props.handleFilter(event.target.value,checked)
        }else{
            props.handleAgeGroup(event.target.value)
        }
    }

    let value  = props.name

    if(props.id==='movies'){
        value = 'movies'
    }else if(props.id==='anyone'){
        value='Anyone'
    }else{
        value = props.name
    }

    return <div>
        <input
            type={props.type}
            className="btn-check"
            name="options-outlined"
            id={props.id}
            autoComplete="off"
            value={value}
            onClick={addFilter}
        />
        <label
            className="btn btn-outline-light"
            htmlFor={props.id}
        >
            {props.name}
        </label>

    </div>
}

export default Checkbox_Radio