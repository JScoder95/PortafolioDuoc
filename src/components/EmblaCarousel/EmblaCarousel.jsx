import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './EmblaCarousel.css';

export const EmblaCarousel = ({ imgs }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {
            imgs.map((image) => <img className="embla__slide" alt="image__slider" src={image}></img>)
        }
      </div>
    </div>
  )
}