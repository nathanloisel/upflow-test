import Pagination from 'components/Pagination';
import * as React from 'react';
import { IPagination } from '.';

export interface ITableFooterProps {
  pagination?: IPagination;
  onPrevPage: VoidFunction;
  onNextPage: VoidFunction;
}

const TableFooter: React.FC<ITableFooterProps> = ({
  pagination,
  onNextPage,
  onPrevPage,
}) => {
  //    const [state, setstate] = useState(undefined);
  return (
    <tfoot>
      <tr>
        <td>
          {pagination && (
            <Pagination
              current={pagination.currentPage}
              total={pagination.total}
              onNext={onNextPage}
              onPrev={onPrevPage}
            />
          )}
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
