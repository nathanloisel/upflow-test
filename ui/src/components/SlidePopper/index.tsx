import * as React from 'react';
import { usePopper } from 'react-popper';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { RangeColumnDefinition } from 'components/Table';
import { SlidePopperContainer, SliderPopper } from './style';

export interface ISlidePopperProps {
  inputValue: number;
  onChange: (value: number) => void;
  colDef: RangeColumnDefinition;
}

const SlidePopper: React.FC<ISlidePopperProps> = ({
  inputValue,
  onChange,
  colDef,
}) => {
  const referenceElement = React.useRef<HTMLDivElement | null>(null);
  const popperElement = React.useRef<HTMLDivElement | null>(null);
  const arrowElement = React.useRef<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [
        {
          name: 'arrow',
          options: { element: arrowElement.current },
        },
      ],
      placement: 'auto',
      strategy: 'absolute',
    }
  );
  return (
    <SlidePopperContainer>
      {inputValue}
      <SliderPopper
        ref={popperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <Slider
          value={inputValue as number}
          orientation="horizontal"
          onChange={onChange}
          tooltip
          step={colDef.rangeStep}
          min={colDef.range[0]}
          max={colDef.range[1]}
        />
        <div ref={arrowElement} style={styles.arrow} />
      </SliderPopper>
    </SlidePopperContainer>
  );
};

export default SlidePopper;
