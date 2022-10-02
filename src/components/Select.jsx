import PropTypes from 'prop-types'

export default function DropDown ({ id, data, value, required }) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">Country</label>
            <select className="form-select" id={id} value={value} required={required} onChange={() => console.log ("change")}>
                {/* Render countries options */}
                { data.map ((option) => <option value={option} key={option} >{option}</option>)}
            </select>
        </div>
    )
}

DropDown.propTypes= {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
}