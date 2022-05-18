const formatDate = (date) => {
  const dateArray = date.replace(/@ /g, '').replace(/,/g, '').split(' ');
  const monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const timeArray = [dateArray.slice(-1)[0]]
    .map((i) =>
      i.match(/am/)
        ? i
            .replace('am', '')
            .split(':')
            .map((i) => Number(i))
        : i
            .replace('pm', '')
            .split(':')
            .map((i, n) => (n === 0 ? Number(i) + 12 : Number(i)))
    )
    .flat();
  dateArray.length === 3
    ? dateArray.splice(2, 0, new Date().getFullYear().toString())
    : dateArray;
  const editDateArray = dateArray.slice(0, 3).concat(timeArray);
  return editDateArray.map((i) => typeof i).join(',')
  return new Date(
    Number(editDateArray[2]),
    monthList.indexOf(editDateArray[1]),
    Number(editDateArray[0]),
    editDateArray[3],
    editDateArray[4]
  ).toUTCString();
};

export default formatDate;
