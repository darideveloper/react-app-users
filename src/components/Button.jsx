import PropTypes from 'prop-types'

export default function Button({size, outline, text, type, disabled}) {
    return (
        <button
            type={type}
            className={`btn px-${size} mt-4 ${(outline) ? "btn-outline-primary" : "btn-primary"}`}
            disabled={disabled}
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
    disabled: PropTypes.bool,
}
