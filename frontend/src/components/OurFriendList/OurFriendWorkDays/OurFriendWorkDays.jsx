import { takeWorkHours } from 'service/workTimeHelper/workTimeHelper';
import css from '../OurFriendItem/OurFriendItem.module.scss';
export const OurFriendWorkDays = ({ workDays }) => {
  const workArr = [];

  takeWorkHours(workDays, workArr);
  return <p className={css.item__info}>{workArr[0].hours}</p>;
};
