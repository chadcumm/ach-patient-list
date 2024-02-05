const fs = require('fs');

function scrambleNames(data) {
  data.visits.forEach(visit => {
    visit.patientName = scramble(visit.patientName);
  });
  return data;
}

function scramble(str) {
  let arr = str.split('');
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

fs.readFile('../assets/data/patient_population.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);
    const scrambledData = scrambleNames(data);
    fs.writeFile('../assets/data/scrambled_patient_population.json', JSON.stringify(scrambledData, null, 2), err => {
      if (err) console.log('Error writing file:', err);
    });
  } catch(err) {
    console.log('Error parsing JSON string:', err);
  }
});