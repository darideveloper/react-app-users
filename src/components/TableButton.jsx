import PropTypes from 'prop-types'

export default function TableButton({ value, onClick, type}) {

    // Generate button classes
    const buttons_classes = {
        "delete": 'btn-danger',
        "edit": "btn-outline-primary",
    }
    let button_class = buttons_classes[value.toLowerCase()]

    if (! type) {
        type = "button"
    }

    return (
        <button
            type={type}
            className={`text-capitalize btn ${button_class} mx-1`}
            onClick={onClick}
        >
            {value}
        </button>
    )
}

TableButton.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
}