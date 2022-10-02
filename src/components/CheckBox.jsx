import PropTypes from "prop-types"

export default function CheckBox ({ class_group, id, label }) {
    return (
        <div className={`${class_group} form-check text-capitalize`}>
            <input className="form-check-input" type="checkbox" id={id} />
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
        </div>
    )
}

CheckBox.propTypes = {
    class_group: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}