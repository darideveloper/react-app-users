import PropTypes from 'prop-types'

export default function TableTags ({value}) {
    return (
        <>
            {value.map((tag) => {
                const tag_id = tag[0]
                const tag_name = tag[1]
    
                return (
                    <span
                        className='p-1'
                        key={tag_id}
                    >
                        {tag_name}
                    </span>
                )
            })}
        </>
    )
}

TableTags.propTypes = {
    value: PropTypes.arrayOf(PropTypes.array).isRequired,
}