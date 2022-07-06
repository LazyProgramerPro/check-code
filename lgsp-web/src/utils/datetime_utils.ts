export const unix_timestamp_to_string = (time: number): string => {
  if (isNaN(time)) {
    return '';
  }
  let a = new Date(time);
  let year = a.getFullYear();
  let month = a.getMonth() + 1;
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  return (
    (date >= 10 ? date : '0' + date) +
    '/' +
    (month >= 10 ? month : '0' + month) +
    '/' +
    year +
    ' ' +
    (hour >= 10 ? hour : '0' + hour) +
    ':' +
    (min >= 10 ? min : '0' + min) +
    ':' +
    (sec >= 10 ? sec : '0' + sec)
  );
}
