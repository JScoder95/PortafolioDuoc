import React, { useState, useEffect, useCallback, Fragment } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { IMAGE, IMAGE1 } from "../../common/constants";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      if (emblaThumbsApi.clickAllowed()) emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.length > 0 ? (
            slides.map((img, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img
                  className="embla__slide__img"
                  src={img}
                  alt="Your alt text"
                />
              </div>
            ))
          ) : (
            <Fragment>
              <div className="embla__slide" key={1} >
                <div className="embla__slide__number">
                  <span>{1}</span>
                </div>
                <img
                  className="embla__slide__img"
                  src={IMAGE1}
                  alt="A cool cat."
                />
              </div>
              <div className="embla__slide" key={2} >
                <div className="embla__slide__number">
                  <span>{2}</span>
                </div>
                <img
                  className="embla__slide__img"
                  src={IMAGE}
                  alt="A cool cat."
                />
              </div>
            </Fragment>
          )}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.length > 0 ? (
              slides.map((img, index) => (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  imgSrc={img}
                  key={index}
                />
              ))
            ) : (
              <Fragment>
                <Thumb
                  onClick={() => onThumbClick(1)}
                  selected={1 === selectedIndex}
                  index={1}
                  imgSrc={IMAGE1}
                  key={1}
                />
                <Thumb
                  onClick={() => onThumbClick(2)}
                  selected={2 === selectedIndex}
                  index={2}
                  imgSrc={IMAGE}
                  key={2}
                />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
