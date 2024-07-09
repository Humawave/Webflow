export function getTimeGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function getTimeEmoji() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "🌅";
  } else if (hour < 18) {
    return "🌤️";
  } else {
    return "🌙";
  }
}

export function convertTo24HourFormat(time) {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

export function calculateTimeDifference(targetDate) {
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  return { hours: diffHrs, minutes: diffMins };
}
