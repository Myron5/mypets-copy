import { OurFriendWorkDays } from '../OurFriendWorkDays/OurFriendWorkDays';
import { Modal } from './OurFriendItemPopUp';
import image from '../../../assets/images/void-Img.png';
import css from './OurFriendItem.module.scss';
import { useState } from 'react';
export const OurFriendItem = ({
  title,
  url,
  addressUrl,
  imageUrl,
  address,
  workDays,
  phone,
  email,
}) => {
  const [modalActive, setModalActive] = useState(false);

  const truncateUntilSecondUppercase = str => {
    let uppercaseCount = 0;
    let startIndex = 0;

    if (title.length > 10) {
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
          uppercaseCount++;
          if (uppercaseCount === 2) {
            startIndex = i; // Запоминаем индекс второй заглавной буквы
            break;
          }
        }
      }
    } else {
      return title.replace(/'/g, '');
    }

    return str.slice(startIndex).replace(/'/g, ''); // Обрезаем строку, начиная с второй заглавной буквы
  };
  const resTruncate = truncateUntilSecondUppercase(title);

  return (

      <li className={css.friend__listitem} href={url}>
        <h2 className={css.friendtitle}>
          {resTruncate.length > 30 ? resTruncate.slice(0, 29) : resTruncate}
        </h2>
        <div className={css.helperbox}>
          <div className={css.boxfriend__logo}>
            <a href={url} target="blank_">
              <img
                src={imageUrl || image}
                alt=""
                className={css.friend__logo}
              />
            </a>
          </div>
          <ul className={css.infolist}>
            {workDays && workDays.length > 0 ? (
              <li
                className={css.infolist__item}
                onMouseEnter={() => setModalActive(true)}
                onMouseLeave={() => setModalActive(false)}
              >
                <p className={css.item__text}>Time:</p>
                <OurFriendWorkDays workDays={workDays} />
                {modalActive && <Modal workDays={workDays} />}
              </li>
            ) : null}

            <li className={css.infolist__item}>
              <p className={css.item__text}>Address</p>
              {address === null ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={css.link__info}
                >
                  Only site
                </a>
              ) : (
                <p className={css.item__info}>
                  <a
                    href={addressUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={css.link__info}
                  >
                    {address}
                  </a>
                </p>
              )}
            </li>
            <li className={css.infolist__item}>
              <p className={css.item__text}>Email: </p>
              {email ? (
                <p className={css.item__info}>
                  <a href={`mailto:${email}`} className={css.link__info}>
                    {email}
                  </a>
                </p>
              ) : (
                <p className={css.item__info}>
                  {' '}
                  <a
                    href={ url }
                    target="_blank"
                    rel="noreferrer"
                    className={css.link__info}
                  >
                    Only wedsite
                  </a>
                </p>
              )}
            </li>
            <li className={css.infolist__item}>
              <p className={css.item__text}>Phone</p>
              {phone === null ? (
                <p className={css.item__info}>No phone info</p>
              ) : (
                <p className={css.item__info}>
                  <a href={`tel:${phone}`} className={css.link__info}>
                    {phone}
                  </a>
                </p>
              )}
            </li>
          </ul>
        </div>
      </li>
  
  );
};
