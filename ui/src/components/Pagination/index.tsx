import * as React from 'react';

export interface IPaginationProps {
  current: number;
  total: number;
  onPrev: VoidFunction;
  onNext: VoidFunction;
}

const Pagination: React.FC<IPaginationProps> = ({
  onNext,
  onPrev,
  total,
  current,
}) => {
  //    const [state, setstate] = useState(undefined);
  return (
    <div>
      <button onClick={onPrev}>Previous page</button>
      <div>
        {current}/{total}
      </div>
      <button onClick={onNext}>Next page</button>
    </div>
  );
};

export default Pagination;
