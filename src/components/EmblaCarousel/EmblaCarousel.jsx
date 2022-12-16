import React, { Fragment, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, PrevButton, NextButton } from "./EmblaCarouselButtons";
import './EmblaCarousel.css';
import { IMAGE, IMAGE1 } from '../../common/constants';

export const EmblaCarousel = ({ imgs }) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla
  ]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);


  return (
    <>
      <div className="emblaa">
        <div className="emblaa__viewport" ref={viewportRef}>
          <div className="emblaa__container">
            { imgs.length > 0 ? imgs.map((index) => (
              <div className="emblaa__slide" key={index}>
                <div className="emblaa__slide__inner">
                  <img
                    className="emblaa__slide__img"
                    src={index}
                    alt="A cool cat."
                  />
                </div>
              </div>
            )) : <Fragment>
              <div className="emblaa__slide">
                <div className="emblaa__slide__inner">
                  <img
                    className="emblaa__slide__img"
                    src={IMAGE}
                    alt="A cool cat."
                  />
                </div>
              </div>
              <div className="emblaa__slide">
              <div className="emblaa__slide__inner">
                <img
                  className="emblaa__slide__img"
                  src={IMAGE1}
                  alt="A cool cat."
                />
              </div>
            </div>
            </Fragment>
            }
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
      <div className="emblaa__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  )
}