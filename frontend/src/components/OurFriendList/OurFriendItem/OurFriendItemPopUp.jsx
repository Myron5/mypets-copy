import { takeWorkHours } from 'service/workTimeHelper/workTimeHelper';
import css from './OurFriendItem.module.scss';
export const Modal = ({ workDays }) => {
  const workArr = [];

  takeWorkHours(workDays, workArr);

  return (
    <div className={css.modal}>
      <ul className={css.modal__list}>
        {workArr.map(({ day, hours }, index) => {
    
          return (
            <li key={index} className={css.modal__listitem}>
                  <p>{day}</p>
                  <p>{hours}</p>
            </li>
            
          );
        })}
      </ul>
    </div>
  );
};
