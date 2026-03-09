import React from 'react'
import Navber from './components/Navber'
import FeaturedCourse from './components/FeaturedCourse'
import Faq from './components/Faq'
import Faq from './components/ImageResizer'
const App = () => {
  return (
    <>
    <Navber></Navber>
    <FeaturedCourse></FeaturedCourse>
      <Faq></Faq>
      <ImageResizer/>
    </>
  )
}

export default App
