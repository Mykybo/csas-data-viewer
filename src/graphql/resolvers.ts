const API_URL_ACCOUNTS = process.env.API_URL_ACCOUNTS
const pageSize = 10

const formatParams = (url, params) => {
  const pairs = []
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      pairs.push(`${key}=${value}`)
    }
  }
  return url + '/?' + pairs.join('&')
}

const resolvers = {
  Query: {
    accounts: async (_, { page }) => {
      let url = API_URL_ACCOUNTS
      url = formatParams(url, { page, size: pageSize })
      const response = await fetch(url, {
        headers: {
          'WEB-API-key': process.env.API_KEY,
        },
      })
      if (!response.ok) {
        throw Error(`Fetch on ${url} failed - response: ${response}`)
      }
      return await response.json()
    },
    transactions: async (_, { accountNumber }) => {
      let url = `${API_URL_ACCOUNTS}/${accountNumber}/transactions`
      url = formatParams(url, { size: pageSize })
      const response = await fetch(url, {
        headers: {
          'WEB-API-key': process.env.API_KEY,
        },
      })
      if (!response.ok) {
        throw Error(`Fetch on ${url} failed - response: ${response}`)
      }
      const parsed = await response.json()
      return parsed.transactions
    },
  },
}

export default resolvers
