import { IAccount } from '@/components/DataView'

const isObject = (val: any) => val === Object(val)

// TODO: make this choosable by user
const excludedKeys = new Set([
  'bankCode',
  'transparencyFrom',
  'transparencyTo',
  'publicationTo',
  'iban',
])

// XXX: should be part of data table
const extractHeaders = (items: IAccount[]) => {
  const headers: Set<string> = new Set()
  items.forEach((item: IAccount) => {
    Object.keys(item).forEach(key => !excludedKeys.has(key) && headers.add(key))
  })
  return Array.from(headers)
}

// XXX: this does not belong to utils
const dataTransform = {
  amount: ({ value, currency }) => `${value} ${currency}`,
  receiver: ({ accountNumber }) => accountNumber,
  sender: ({ name, description }) => name || description,
}

const HeaderTranslations = {
  accountNumber: 'Číslo účtu',
  actualizationDate: 'Poslední aktualizace',
  amount: 'Částka',
  balance: 'Zůstatek',
  currency: 'Měna',
  dueDate: 'Do',
  name: 'Jméno',
  processingDate: 'Datum zpracování',
  receiver: 'Příjemce',
  sender: 'Odesílatel',
  type: 'Typ',
  typeDescription: 'Popis',
}

const formatData = (key, value) => {
  const transform = dataTransform[key]
  if (transform) {
    return transform(value)
  }
  return value
}

// TODO: translations should be done using some lib such as i18n
const translateHeader = val => HeaderTranslations[val] || val

// TODO: pagination functionality should be moved to a new pagination component
const getPaginationItems = (current: number, last: number): number[] => {
  const delta = 2
  const left = current - delta
  const right = current + delta
  const range = []

  // Create row of nums around actual page + first + last
  for (let i = 0; i <= last; i += 1) {
    if (i === 0 || i === last || (i >= left && i <= right)) {
      range.push(i)
    }
  }

  // Insert dots if row is not continous
  if (range.length > 3) {
    if (range[1] !== 1) {
      range.splice(1, 0, null)
    }
    if (range[range.length - 2] !== last - 1) {
      range.splice(range.length - 1, 0, null)
    }
  }

  return range
}

export {
  isObject,
  extractHeaders,
  excludedKeys,
  translateHeader,
  formatData,
  getPaginationItems,
}
