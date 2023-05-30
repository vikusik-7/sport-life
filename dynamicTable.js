// ---------- DYNAMIC TABLE ------------ //

// Set date
let date = setDate()

// Load table
Load(date)

// Refresh month
// refreshMonth(date)

// Button to previouse day
document.getElementById('previous').onclick = () => {
  date[0] -= 1
  setDate(date)
  deleteAll()
  Load(date)
}

// Button to next day
document.getElementById('next').onclick = () => {
  date[0] = Number(date[0]) + 1
  setDate(date)
  deleteAll()
  Load(date)
}

// Binding event
document.getElementById('inputSubmit').onclick = addNewRow
// First activation delete buttons
deleteRow()

// Add new row
function addNewRow() {
  // Get inputs
  const activity = validation(document.getElementById('activeInput'))
  const time = validation(document.getElementById('timeInput'))
  const calories = validation(document.getElementById('caloriesInput'))

  const data = {
    'activity': activity.value,
    'time': time.value,
    'calories': calories.value
  }

  renderRow(data)

  Save(date, data)

  // Clear inputs
  activity.value = ''
  time.value = '00:00'
  calories.value = ''
}


// Delete row
function deleteRow() {
  // Get all delete buttons
  let deleteButton = document.getElementsByName('del')
  // Add event listener for each button in loop
  deleteButton.forEach(function (item) {
    item.onclick = function () {
      // Get activity name
      const activity = item.parentNode.parentNode.firstChild
      // Remove TR from Local Storage
      Delete(date[0], activity.innerHTML)

      // Remove TR from tbody 
      // delete button > TD > TR > tbody
      item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode)
    }
  })
}


function deleteAll() {
  // Delete all rows
  let tbody = document.getElementById('diary')
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}


// Validation and coloring input zone in error case
function validation(element) {
  // Coloring input
  if (!element.value) {
    element.classList.add('error')
  }
  // Uncoloring input
  if (element.value && element.classList.contains('error')) {
    element.classList.remove('error')
  }

  return element
}

function renderRow(data) {
  // General validation
  if (!data.activity || !data.time || !data.calories) {
    return
  }

  // Create TR
  let newRow = document.createElement('tr')

  // Create TDs
  let activityCol = document.createElement('td')
  let timeCol = document.createElement('td')
  let caloriesCol = document.createElement('td')
  let settingsCol = document.createElement('td')


  // Filling TDs
  activityCol.innerHTML = data.activity
  timeCol.innerHTML = data.time
  caloriesCol.innerHTML = data.calories
  settingsCol.classList.add('settings')

  // Create delete button
  let settingsBtn = document.createElement('input')
  settingsBtn.value = 'видалити'
  settingsBtn.type = 'button'
  settingsBtn.name = 'del'

  // Put delete button into TD
  settingsCol.appendChild(settingsBtn)

  // Put TDs into TR
  newRow.appendChild(activityCol)
  newRow.appendChild(timeCol)
  newRow.appendChild(caloriesCol)
  newRow.appendChild(settingsCol)

  // Get table
  let table = document.getElementById('diary')
  // Put new row into table
  table.appendChild(newRow)

  // Activation new delete button
  deleteRow()
}

// --------- LOCAL STORAGE --------- //


// Local Storage structure:
// {
//     day(number): {
//         activity(string): {
//             time: number,
//             callories: number
//         }
//     }
// }

function Save(date, data) {
  // Get old data
  let oldData = localStorage.getItem(Number(date[0]))

  // If data is empty
  if (oldData) {
      oldData = JSON.parse(oldData)
  }

  // Refresh data
  if (!oldData) {
      oldData = {}
  }
  if (!oldData.hasOwnProperty(data.activity)) {
      oldData[data.activity] = {}
  }

  oldData[data.activity].time = data.time
  oldData[data.activity].calories = data.calories

  // Save it
  localStorage.setItem(Number(date[0]), JSON.stringify(oldData))
  localStorage.month = date[1]
  localStorage.year = date[2]
}


function Delete(day, activity) {
  // Get old data
  let oldData = localStorage.getItem(Number(day))

  // If data is empty
  if (!oldData) {
      return
  } else {
      oldData = JSON.parse(oldData)
  }

  // Refresh data
  delete oldData[activity]

  // Save it
  localStorage.setItem(Number(day), JSON.stringify(oldData))
}


function Load(date) {
  // Let today data
  let data = localStorage[date[0]]

  // If data is empty
  if (!data) {
      return
  } else {
      data = JSON.parse(data)
  }

  // Render every row
  for (let activity in data) {
      const renderData = {
          'activity': activity,
          'time': data[activity].time,
          'calories': data[activity].calories
      }
      renderRow(renderData)
  }
}

// function refreshMonth(date) {
//   if (localStorage.month && localStorage.year) {
//       if (date[1] !== localStorage.month || date[2] !== localStorage.year) {
//           let deleteButton = document.getElementsByName('del')
//           deleteButton.forEach(function (item) {
//               item.click()
//           })
//       }
//       localStorage.clear()
//   }
// }


// ----------- DEFINE DATE ------------ //

function isLeap(year) {
  return (new Date(year, 2, 0)).getDate() == 29
}

function isLastDayOfMonth(day, month, year) {
  const longMonthes = ['01', '03', '05', '07', '08', '10', '12']
  const shortMonthes = ['04', '06', '09', '11']
  const february = '02'

  if ((longMonthes.includes(month) && day !== '31') ||
      (shortMonthes.includes(month) && day !== '30') ||
      (month === february && isLeap(year) && day !== '29') ||
      (month === february && !isLeap(year) && day !== '28')) return true

  return false
}

function defineTomorrow(day, month, year) {
  let date
  if (arguments.length === 3) {
      date = new Date(Number(year), Number(month) - 1, Number(day) + 1)
  } else {
      date = new Date()
  }

  // Return date in format [DD, MM, YYYY]
  return date.toISOString().slice(0, 10).split('-').reverse()
}

function buttonsRender(date) {
  const day = date[0]
  const month = date[1]
  const year = date[2]

  let previous = document.getElementById('previous')
  let next = document.getElementById('next')

  // Render previous button
  if (day !== '01') {
      previous.style.visibility = 'visible'
  } else {
      previous.style.visibility = 'hidden'
  }
  // Render next button
  if (isLastDayOfMonth(day, month, year)) {
      next.style.visibility = 'visible'
  } else {
      next.style.visibility = 'hidden'
  }
}

function setDate(date) {
  let tomorrow
  if (arguments.length > 0) {
      tomorrow = defineTomorrow(date[0], date[1], date[2])
  } else {
      tomorrow = defineTomorrow()
  }

  let label = document.getElementById('label')
  label.innerHTML = 'Моя активність за ' + tomorrow.join('.')

  buttonsRender(tomorrow)
  return tomorrow
}