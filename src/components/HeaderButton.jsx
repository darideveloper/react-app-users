import { useContext } from 'react'
import { ScreenContext } from '../context/ScreenContext'
import PropTypes from 'prop-types'

export default function HeaderButton({value}) {
    const { setScreen } = useContext(ScreenContext)

    return (
        <li className='nav-item'>
            <button className='nav-link border-0 bg-transparent' onClick={function () {setScreen(value)}}>
                {value.toUpperCase()}
            </button>
        </li>
    )
}

HeaderButton.propTypes = {
    value: PropTypes.string.isRequired,
}