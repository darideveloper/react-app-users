import PropTypes from 'prop-types'

export default function Button({size, outline, text, type, color, disabled, onClick}) {

    if (! color) {
        color = "primary"
    }

    let button_style = `btn-${color}`
    if (outline) {
        button_style = `btn-outline-${color}`
    }

    return (
        <button
            type={type}
            className={`btn px-${size} mt-4 mx-2 ${button_style}`}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

Button.propTypes = {
    size: PropTypes.number.isRequired,
    outline: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
}
