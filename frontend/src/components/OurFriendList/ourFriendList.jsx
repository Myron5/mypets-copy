import css from "./ourFriendList.module.scss"
import { OurFriendItem } from './OurFriendItem/OurFriendItem';
import { fetchSponsors } from 'service/api/apiFriend';
import { useState, useEffect } from 'react';

export const OurFriend = () => {
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const featchData = async () => {
      const fetch = await fetchSponsors();
      setFriend(fetch.data);
    };
    featchData().catch(console.error);
  }, []);

  return (
    <>
      <h1 className={css.title}>Our friends</h1>
      <ul className={css.friend__list}>
        {friend.map(
          ({ 
            title,
            url,
            addressUrl,
            imageUrl,
            address,
            workDays,
            phone,
            email,
          }) => (
            <OurFriendItem
              key={title}
              title={title}
              url={url}
              addressUrl={addressUrl}
              imageUrl={imageUrl}
              address={address}
              workDays={workDays}
              phone={phone}
              email={email}
            />
          )
        )}
      </ul>
    </>
  );
};
