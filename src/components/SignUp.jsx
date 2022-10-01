import {countries_names} from '../js/countries'
import Input from './Input'
import Button from './Button'
import DropDown from './Select'

export default function SignUp ({roles}) {
    
    return (
        <section className="signup-wrapper">
            <h1 className="text-center">Sign Up</h1>
            <div className="signup">
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-md-6 mt-3 mt-md-5">
                        <form className="mt-0">
                            <Input id="first" label="First name" type="text" placeholder="John" minLength={3} required={true}/>
                            <Input id="last" label="Last name" type="text" placeholder="Doe" minLength={3} required={true}/>
                            <Input id="email" label="Email" type="email" placeholder="johndoe@gmail.com" minLength={6} required={true}/>
                            <Input id="phone" label="Phone" type="tel" placeholder="555 555 1234" minLength={10} required={true}/>
                            <DropDown id="country" data={countries_names} value="United States" required={true} />
                            <DropDown id="rol" data={roles} value="Standard" required={true} />
                            <Input id="password1" label="Password" type="password" placeholder="" minLength={8} required={true}/>
                            <Input id="password2" label="Repeat password" type="password" placeholder="" minLength={8} required={true}/>
                            <Button size={5} outline={true} text="Submit" />
                        </form>
                    </div>
                    <div className="col-12 col-md-6">
                        <img className="w-75 mx-auto d-block" src="imgs/register.svg" alt="register illustration" />
                    </div>
                </div>
            </div>
        </section>
    )
}