import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="about.png" />
      </div>
      <div className="banner">
      <p>Biography</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam est ex unde eos non a explicabo fuga ad molestias consequatur tenetur, maiores ipsam repudiandae corporis nemo consectetur voluptates, quibusdam vel. Ratione ipsum, incidunt at quos id numquam possimus sed nisi rerum totam ullam maiores minus quae. Veniam ad optio nulla?
      </p>  
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi illum molestiae laborum asperiores sequi officia ducimus minima facilis similique. Labore, esse quasi aliquid itaque nulla at natus exercitationem nobis, eius corrupti cupiditate modi aspernatur praesentium.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At explicabo eveniet reprehenderit?</p>
      <p>Lorem, ipsum dolor.</p>
      </div>      
    </div>
  )
}

export default Biography
