import React, { useState } from 'react'
import CustomerLoginPage from "./CustomerLoginPage"
import CustomerRegistrationPage from './CustomerRegistrationPage'

function LandingPage() {
  
  return (
    <div
      className="bg-auto bg-no-repeat bg-center relative bg-img"
    >
      <HeroComponent />
      <BodySection />
      <TestimonialSection />
      <FooterSection />
    </div>
  )
}

const FooterSection = () => {
  return (
    <footer>
      <div class="container mx-auto px-6">
        <div class="mt-4 border-t-2 border-gray-300 flex flex-col items-center">
          <div class="sm:w-2/3 text-center py-6">
            <p class="text-lg text-blue-700 font-bold mb-2">
              © 2022 CSS Powered by Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

const TestimonialSection = () => {
  const testimonialList = [
    { name: "Marsey Kale", imgUrl: "https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg", proffession: "Photographer", classes: "bg-gradient-to-r from-cyan-500 to-blue-500" },
    { name: "Hailey Gensie", imgUrl: "https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg", proffession: "UX Designer", classes: "w-full bg-gradient-to-l from-sky-500 to-indigo-500" },
  ];

  const renderTestimonials = () => testimonialList.map(item => <RenderTestimonial key={item.name} item={item} />)

  return (
    <div class="w-full">
      <h2 class="text-6xl font-bold my-4 bg-slate-900 text-white">Testimonials</h2>
      <div className='flex flex-col gap-4'>
        {renderTestimonials()}
      </div>
    </div>
  )
}

const RenderTestimonial = ({ item }) => {
  return (
    <div class={`w-full m-auto px-3 ${item.classes} py-4`}>
      <img class="rounded-full shadow-lg mb-6 mx-auto"
        src={item.imgUrl} alt="avatar" />
      <h5 class="text-lg font-bold mb-3">{item.name}</h5>
      <p class="font-medium text-gray-700 mb-4">{item.proffession}</p>
      <p class="text-gray-900 mb-6 font-bold w-1/2 m-auto">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left"
          class="w-6 pr-2 inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z">
          </path>
        </svg>In ac turpis justo. Vivamus auctor quam vitae odio feugiat pulvinar. Sed semper
        ligula sed lorem tincidunt dignissim. Nam sed cursus lectus. Proin non rutrum
        magna. Proin gravida, justo et imperdiet tristique, turpis nisi viverra est, nec
        posuere ex arcu sit amet erat. Sed a dictum sem. Duis pretium condimentum nulla.
      </p>
    </div>
  )
}

const BodySection = () => {
  let [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const handleClick = () => setShowRegistrationForm(prev => !prev)

  const forRegister = { ques: "Have Account Already?", action: "Login", actionHandler: handleClick, comp: <CustomerRegistrationPage /> }
  const forLogin = { ques: "No Account Yet?", action: "Register", actionHandler: handleClick, comp: <CustomerLoginPage /> }

  return (
    <div className='flex gap-4 justify-center py-16 body-section'>
      {showRegistrationForm ? null : <LeftSide item={forRegister} />}
      {showRegistrationForm ? <RightSide item={forLogin} /> : null}
    </div>
  )
}

const RightSide = ({ item }) => {
  return (
    <div>
      <CustomerRegistrationPage />
      <UserAuthSchemeAlert item={item} />
    </div>
  )
}

const LeftSide = ({ item }) => {
  return (
    <div>
      <CustomerLoginPage />
      <UserAuthSchemeAlert item={item} />
    </div>
  )
}

const UserAuthSchemeAlert = ({ item }) => {
  return (
    <div className='bg-teal-400 rounded'>
      <p>{item.ques} <span>Click here to <button className='bg-slate-800 text-white px-6 py-2 my-2 rounded' onClick={item.actionHandler}>{item.action}</button></span></p>
    </div>
  )
}

const HeroComponent = () => {
  return (
    <div className='relative mb-6'>
      <BlockQuote />
      {/* <HeroBackgroundImage /> */}
    </div>
  )
}

const HeroBackgroundImage = () => {
  return (
    <div
      style={{
        background: "url(https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
        backgroundBlendMode: "multiply"
      }}
      className="min-h-screen bg-cover bg-no-repeat bg-local antialiased">
    </div>
  )
}

const BlockQuote = () => {
  return (
    <blockquote className="text-6xl font-semibold italic text-center text-slate-900
                           bg-slate-300 py-16"
    >
      <h2>Your home for sustainable shopping and savings</h2>
      <h4>You first, Faster shippment and Many More Features</h4>
    </blockquote>
  )
}


export default LandingPage