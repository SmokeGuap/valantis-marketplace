const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
  const day = now.getDate();

  return `${year}${month}${day}`;
};

export default getTodayDate;
