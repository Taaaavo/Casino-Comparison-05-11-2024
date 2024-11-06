export function getKey(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    notify.error('Error while fetching data');
    return null;
  }
}

export function setKey(key, data) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export function getItem(key, item) {
  const data = getKey(key);

  if (!data) return null;

  return data.hasOwnProperty(item) ? data[item] : null;
}
