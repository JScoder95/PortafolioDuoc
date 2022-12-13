import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './EmblaCarousel.css';

export const EmblaCarousel = ({ imgs }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  return (
    <div className="emblaa" ref={emblaRef}>
      <div className="emblaa__container">
        {
            imgs.map((image) => <img className="emblaa__slide" alt="image__slider" src={image}></img>)
        }
      </div>
    </div>
  )
}