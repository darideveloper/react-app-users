import PropTypes from 'prop-types'

export default function Input({ id, label, type, placeholder, minLength, required }) {
    return (
        <div className='mb-3'>
            <label
                htmlFor={id}
                className='form-label'
            >
                {label}
            </label>
            <input
                type={type}
                className='form-control'
                id={id}
                placeholder={placeholder}
                minLength={minLength}
                required={required}
            />
        </div>
    )
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    minLength: PropTypes.number,
    required: PropTypes.bool,
}
