import axios from 'axios'

const apiKey = process.env.EMAILOCTOPUS_API_KEY
const listId = process.env.EMAILOCTOPUS_LIST_ID
const endpoint = `https://emailoctopus.com/api/1.5/lists/${listId}/contacts?api_key=${apiKey}`

exports.handler = async function (event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 404,
      body: JSON.stringify({
        success: false,
        message: 'Not found',
      })
    }
  }

  const { email, consent } = JSON.parse(event.body)

  if (!email || !consent) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
      })
    }
  }

  try {
    const response = await axios.post(endpoint, {
      email_address: email,
    })

    return {
      statusCode: response.status,
      body: JSON.stringify({
        success: true,
      })
    }
  } catch ({response}) {
    return {
      statusCode: response.status || 500,
      body: JSON.stringify({
        success: false,
        error: {
          code: response.data?.error?.code || 'NO_CODE_PROVIDED',
          message: response.data?.error?.message || 'Failed to subscribe, please try again later.',
        },
      }),
    }
  }
}
