import PropTypes from 'prop-types'

export default function Table ({headers, body, layout}) {
    return (

        <div className={`table-wrapper ${layout} p-4`}>
            <table className='table table-results'>
                <thead>
                    <tr>
                        {
                            headers.map (header => <th key={header} scope='col'>{header}</th>)
                        }
                    </tr>
                </thead>
                <tbody className='border-white'>{body}</tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    headers: PropTypes.array.isRequired,
    body: PropTypes.any.isRequired,
    layout: PropTypes.string.isRequired,
}