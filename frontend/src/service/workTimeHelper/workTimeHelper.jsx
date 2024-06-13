const days = ['MN', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

export const takeWorkHours = (workDays, workArr) => {
  workDays.map(({ isOpen, from, to }, index) => {

    return isOpen ? workArr.push({day: days[index], hours: `${from}-${to}`}) : null;
  });
};
