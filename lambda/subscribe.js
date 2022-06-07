import axios from 'axios'
import dotenv from 'dotenv'
import get from 'lodash.get'

dotenv.config()

const apiKey = process.env.EMAILOCTOPUS_API_KEY
const listId = process.env.EMAILOCTOPUS_LIST_ID

export async function handler(event) {
  try {
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
      const url = `https://emailoctopus.com/api/1.5/lists/${listId}/contacts?api_key=${apiKey}`

      const response = await axios.post(url, {email_address: email})

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
            code: get(response, 'data.error.code', 'NO_CODE_PROVIDED'),
            message: get(response, 'data.error.message', 'Failed to subscribe, please try again later.'),
          },
          url: `https://emailoctopus.com/api/1.5/lists/${listId}/contacts?api_key=${apiKey}`
        }),
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      }),
    }
  }
}
