export default function random(number, end) {
  if(!end)
    return Math.floor(Math.random() * (number || 1));
  else
    return number + Math.floor(Math.random() * (end - number));
}
