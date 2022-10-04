import { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function Select({ id, data, value, label, required, onChange, onLoad }) {

    // Run onload function
    // useEffect(function () {
    //     if (onLoad && data) {
    //         const select = document.querySelector (`#${id}`)
    //         if (select) {
    //             onLoad (select.value)
    //         }
    //     }
    // }, [data])

    return (
        <div className='mb-3'>
            <label
                htmlFor={id}
                className='form-label'
            >
                {label}
            </label>
            <select
                className='form-select'
                id={id}
                value={value}
                required={required}
                onChange={function (event) {onChange(event.target.value)}}
                // onChange={function (event) {value=event.target.value}}
            >
                {/* Render countries options */}
                {data.map((option) => (
                    <option
                        value={option}
                        key={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

Select.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    onLoad: PropTypes.func,
}
