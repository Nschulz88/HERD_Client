// eslint-disable-next-line
function delay(t = 2000){
  return new Promise(res => setTimeout(res, t));
}

async function getVolunteers(){
  // await delay();
  // return [{id: 1, name: 'Dominic'}, {id: 2, name: 'Sam'}, {id: 3, name: 'Natalie'}];
  const response = await fetch('/volunteers');
  const data = await response.json();
  console.log('From API', data);
  return data;
}

export {getVolunteers};
