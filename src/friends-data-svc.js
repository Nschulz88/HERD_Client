// eslint-disable-next-line
function delay(t = 2000){
  return new Promise(res => setTimeout(res, t));
}

async function getFriends(){
  // await delay();
  // return [{id: 1, name: 'Dominic'}, {id: 2, name: 'Sam'}, {id: 3, name: 'Natalie'}];
  const response = await fetch('/api/friends');
  const data = await response.json();
  console.log('From API', data);
  return data;
}

export {getFriends};