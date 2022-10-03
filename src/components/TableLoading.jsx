import PropTypes from 'prop-types'
import Loading from './Loading'

export default function TableLoading ({ col_span }) {
    // Loading component inside table bodies

    return (
        <tr>
            <td
                colSpan={col_span}
                className='text-center p-5'
            >
                <Loading />
            </td>
        </tr>
    )
}

TableLoading.propTypes = {
    col_span: PropTypes.number.isRequired,
}

