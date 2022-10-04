import UsersForm from './UsersForm'

export default function SignUp() {
    return (
        <section className='UsersForm-wrapper mb-5'>
            <h1 className='text-center'>Sign Up</h1>
            <div className='UsersForm'>
                <div className='row d-flex align-items-center'>
                    <div className='col-12 col-md-6 mt-3 mt-md-5'>
                        <UsersForm 
                            onSubmit={console.log ("submit")}
                        />
                    </div>
                    <div className='col-12 col-md-6'>
                        <img
                            className='w-75 mx-auto d-block'
                            src='imgs/register.svg'
                            alt='register illustration'
                        />
                    </div>
                </div>
            </div>
        </section>
    )

}