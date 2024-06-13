import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { LiaLongArrowAltLeftSolid } from 'react-icons/lia';
import { Pagination, PaginationItem } from '@mui/material';
import css from './Paginations.module.css';
import { useMediaQuery } from '@react-hook/media-query';

const Paginations = ({ currentPage, totalPages, handlePaginationChange }) => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)');

  let size = '34px';
  if (isMediumScreen) {
    size = '35px';
  }
  const handleChange = (_, value) => {
    handlePaginationChange(value);
  };

  return (
    <div className={css.pagContainer}>
      {totalPages !== 0 && (
        <Pagination
          page={currentPage}
          onChange={handleChange}
          defaultPage={1}
          boundaryCount={0}
          siblingCount={1}
          count={totalPages >= 50 ? 50 : totalPages}
          variant="outlined"
          sx={{
            'Button.MuiPaginationItem-circular.Mui-selected': {
              bgcolor: '#54ADFF',
              color: '#fff',
              border: '1px solid #54ADFF',
              width: size,
              height: size,
              borderRadius: '50%',
            },
            button: {
              color: '#111111',
              backgroundColor: '#fff',
              border: '1px solid #54ADFF',
              width: size,
              height: size,
              borderRadius: '50%',
            },
          }}
          renderItem={item => (
            <PaginationItem
              components={{
                previous: LiaLongArrowAltLeftSolid,
                next: LiaLongArrowAltRightSolid,
              }}
              {...item}
            />
          )}
        />
      )}
    </div>
  );
};

export default Paginations;
