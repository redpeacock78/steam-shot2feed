import datefns from 'date-fns';

const dateFormat = (date) => {
  const format = 'yyyy-MM-dd HH:mm';
  const referenceDate = new Date();
  const editDate = date.match(/年/)
    ? date
        .replace(/年/, '-')
        .replace(/月/, '-')
        .replace(/時/, ':')
        .replace(/日/, '')
        .replace(/分/, '')
    : `${new Date().getFullYear().toString()}-${date}`
        .replace(/月/, '-')
        .replace(/時/, ':')
        .replace(/日/, '')
        .replace(/分/, '');
  return datefns.parse(editDate, format, referenceDate).toUTCString();
};

export default dateFormat;
