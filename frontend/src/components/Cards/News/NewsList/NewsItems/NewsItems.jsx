import React, { useState } from 'react';
import noImgAvailable from '../../../../../assets/images/no-image-available.jpg';
import css from './NewsItems.module.css';
import dayjs from 'dayjs';

const NewsItems = ({ title, body, date, image, url }) => {
  const formattedDate = dayjs(date).format('DD/MM/YYYY');
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <li className={css.item}>
      <img
        alt={title}
        loading="lazy"
        className={css.image}
        src={imageError ? noImgAvailable : image || noImgAvailable}
        onError={handleImageError}
      />

      <div className={css.itemBox}>
        <div>
          <h2 className={css.title}>{title}</h2>
          <div className={css.textWrap}>
            <p className={css.text}>{body}</p>
          </div>
        </div>
        <div className={css.itemWrapper}>
          <p className={css.date}>{formattedDate}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            Read more
          </a>
        </div>
      </div>
    </li>
  );
};

export default NewsItems;
