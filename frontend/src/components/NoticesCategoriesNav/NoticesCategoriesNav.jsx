// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { authSelector } from 'redux/auth/selectors';

// import {changeCategory, fetchPets} from '../../redux/pets/operations'
import categories from './categories';
import styles from './notices-categories-nav.module.scss';

const { publicCategories, privateCategories } = categories;

const getFullName = (location, category) => {
  const res =
    category === location ? `${styles.button} ${styles.active}` : styles.button;
  return res;
};

const NoticesCategoriesNav = () => {
  //   const { token } = useAuth();
  const { pathname, search } = useLocation();
  const isAuth = useSelector(authSelector);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {publicCategories.map(({ to, text, id }) => (
          <li key={id}>
            <Link
              to={{ pathname: to, search }}
              className={getFullName(pathname, to)}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
      {isAuth && (
        <ul className={styles.list}>
          {privateCategories.map(({ to, text, id }) => (
            <li key={id}>
              <Link
                to={{ pathname: to, search }}
                className={getFullName(pathname, to)}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoticesCategoriesNav;
