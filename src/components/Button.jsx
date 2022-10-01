import PropTypes from 'prop-types'

export default function Button({size, outline, text}) {
    return (
        <button
            type='button'
            className={`btn px-${size} mt-4 ${(outline) ? "btn-outline-primary" : "btn-primary"}`}
        >
            {text}
        </button>
    )
}

Button.propTypes = {
    size: PropTypes.number.isRequired,
    outline: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
}
