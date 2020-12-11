const convertTimeStampToDate = timestamp => {
  const newDate = new Date(timestamp * 1000);
  const toDateString = newDate.toLocaleDateString();
  const toTimeString = newDate.toLocaleTimeString();

  return `${toDateString} ${toTimeString}`;
};

export default convertTimeStampToDate;
