import React from 'react'
import Hero from '../components/HEro'
import Biography from '../components/Biography'

const AboutUS = () => {
  return (
    <div>
      <Hero title={"Learn More AbBout Us | ZeeCare Medical Institute"} imageUrl={"/about.png"}/>
      <Biography imageUrl={"/whoweare.png"}/>
    </div>
  )
}

export default AboutUS
