import UsersForm from './components/UsersForm'
import Button from './components/Button'

export default function SignUp() {

    const submit_button = (
        <>
            <Button
                size={5}
                outline={true}
                text="Submit"
                type="submit"
                disabled={true}
            />
        </>
    )

    return (
        <section className='UsersForm-wrapper mb-5'>
            <h1 className='text-center'>Sign Up</h1>
            <div className='UsersForm'>
                <div className='row d-flex align-items-center'>
                    <div className='col-12 col-md-6 mt-3 mt-md-5'>
                        <UsersForm 
                            onSubmit={console.log ("submit")}
                            layout="col-12"
                            buttons={submit_button}
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