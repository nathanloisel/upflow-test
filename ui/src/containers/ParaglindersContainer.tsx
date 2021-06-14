import * as React from 'react';
import { IParaglinder } from '../types/paraglinders';
import ParaglindersTable from 'components/ParablindersTable';
import { useParaglinders } from 'graphql/queries';
import {
  useDeleteParaglinders,
  useUpdateParaglinders,
} from 'graphql/mutations';

export interface IProps {}

const ParaglindersContainer: React.FunctionComponent<IProps> = (props) => {
  const {
    loading,
    error,
    paraglinders,
    pagination,
    onSort,
    onPrevPage,
    onNextPage,
    refetch,
  } = useParaglinders();

  const [currentParaglinders, setCurrentParaglinders] = React.useState(
    paraglinders || []
  );

  React.useEffect(() => {
    setCurrentParaglinders(paraglinders || []);
  }, [paraglinders]);

  const { deleteParaglinder, response: deleteResponse } =
    useDeleteParaglinders();

  const { updateParaglinder, response: updateResponse } =
    useUpdateParaglinders();

  const onParaglinderDelete = React.useCallback(
    (index: number) => {
      if (currentParaglinders && currentParaglinders[index]) {
        deleteParaglinder(
          currentParaglinders[index].name,
          currentParaglinders[index].brand
        ).then(({ errors, data }) => {
          if (!errors && data) refetch();
        });
      }
    },
    [deleteParaglinder, currentParaglinders, refetch]
  );

  const onParaglinderChange = React.useCallback(
    (index: number, newData: IParaglinder) => {
      if (currentParaglinders && currentParaglinders[index]) {
        updateParaglinder({ ...newData }).then(({ errors, data }) => {
          if (!errors && data) {
            setCurrentParaglinders([
              ...currentParaglinders.slice(0, index),
              data.updateParaglinder,
              ...currentParaglinders.slice(index + 1),
            ]);
          }
        });
      }
    },
    [updateParaglinder, currentParaglinders]
  );

  return (
    <ParaglindersTable
      loading={loading}
      paraglinders={currentParaglinders}
      pagination={pagination}
      error={error}
      onSort={onSort}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
      onDelete={onParaglinderDelete}
      onRowChange={onParaglinderChange}
    />
  );
};

export default ParaglindersContainer;
