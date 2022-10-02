import PropTypes from 'prop-types'

export default function Select ({ id, data, value, label, required }) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <select className="form-select" id={id} value={value} required={required} onChange={() => console.log ("change")}>
                {/* Render countries options */}
                { data.map ((option) => <option value={option} key={option} >{option}</option>)}
            </select>
        </div>
    )
}

Select.propTypes= {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
}