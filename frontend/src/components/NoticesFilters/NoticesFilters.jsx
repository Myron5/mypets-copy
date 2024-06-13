import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './notices-filters.module.scss';
import sprite from 'assets/svg/sprite-cards.svg';

const ChevronUpIcon = ({ className }) => {
  return (
    <svg className={className} width="24" height="24">
      <use href={`${sprite}#icon-chevron-up`}></use>
    </svg>
  );
};

const ChevronDownIcon = ({ className }) => {
  return (
    <svg className={className} width="24" height="24">
      <use href={`${sprite}#icon-chevron-down`}></use>
    </svg>
  );
};

const FiltersIcon = ({ className }) => {
  return (
    <svg className={className} width="24" height="24">
      <use href={`${sprite}#icon-filters-3`}></use>
    </svg>
  );
};

const NoticesFilters = ({ onFilter, filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  useEffect(() => {
    onFilter(selectedCheckboxes);
  }, [onFilter, selectedCheckboxes]);

  const handleBtnClick = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleAgeClick = () => {
    setAgeOpen(prevState => !prevState);
  };

  const handleGenderClick = () => {
    setGenderOpen(prevState => !prevState);
  };

  const handleCheckboxChange = e => {
    const { name, value, checked } = e.target;

    if (checked) {
      setSelectedCheckboxes(prevSelected => [...prevSelected, { name, value }]);
    } else {
      setSelectedCheckboxes(prevSelected =>
        prevSelected.filter(item => item.name !== name)
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.openBtn}
        type="button"
        onClick={handleBtnClick}
        aria-label="toggle filters"
      >
        <span className={styles.openBtnLabel}>Filter</span>
        <FiltersIcon className={styles.openBtnIcon} />
      </button>
      {isOpen && (
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdown}>
            <p className={styles.text}>Filters</p>
            <div className={styles.submenu}>
              <button
                className={styles.filterBtn}
                type="button"
                onClick={handleAgeClick}
                aria-label="toggle age options"
              >
                {ageOpen ? (
                  <ChevronUpIcon className={styles.icon} />
                ) : (
                  <ChevronDownIcon className={styles.icon} />
                )}
                <span className={styles.btnLabel}>By age</span>
              </button>
              {ageOpen && (
                <form className={styles.form}>
                  <label className={styles.label}>
                    <input
                      onChange={handleCheckboxChange}
                      className={styles.input}
                      type="checkbox"
                      name="dateone"
                      value="1"
                    />
                    3-12m
                  </label>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      name="datetwo"
                      value="1"
                    />
                    1 year
                  </label>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      name="datethree"
                      value="1"
                    />
                    2 year
                  </label>
                </form>
              )}
            </div>
            <div className={styles.submenu}>
              <button
                className={styles.filterBtn}
                type="button"
                onClick={handleGenderClick}
                aria-label="toggle gender options"
              >
                {genderOpen ? (
                  <ChevronUpIcon className={styles.icon} />
                ) : (
                  <ChevronDownIcon className={styles.icon} />
                )}
                <span className={styles.btnLabel}>By gender</span>
              </button>
              {genderOpen && (
                <form className={styles.form}>
                  <label className={styles.label}>
                    <input
                      onChange={handleCheckboxChange}
                      className={styles.input}
                      type="checkbox"
                      name="sex"
                      value="male"
                    />
                    male
                  </label>
                  <label className={styles.label}>
                    <input
                      onChange={handleCheckboxChange}
                      className={styles.input}
                      type="checkbox"
                      name="sex"
                      value="female"
                    />
                    female
                  </label>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

NoticesFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
};

export default NoticesFilters;
