export function getCurrentDateFormatted(dateString) {
  if(dateString) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const currentDate = new Date(dateString);
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    // Pad day with leading zero if needed
    const formattedDay = day < 10 ? `0${day}` : day;

    // Assemble the formatted date string
    return `${formattedDay} ${month} ${year}`;
  }
  return '';
}