// Handle a POST request to /api/subscribe
export async function onRequestPost(context) {
  // Get the email address to sign up from a form submission
  let email

  try {
    const input = await context.request.formData()
    email = input.get('email')
  } catch (err) {
    console.trace(err)
    return new Response('Error reading email from form data', { status: 400 })
  }

  // Call your mailing list provider's API
  const baseUrl = context.env.EMAILOCTOPUS_API_URL
  const listId = context.env.EMAILOCTOPUS_LIST_ID
  const res = await fetch(`${baseUrl}/lists/${listId}/contacts`, {
    method: 'POST',
    body: JSON.stringify({
      api_key: context.env.EMAILOCTOPUS_API_KEY,
      email_address: email,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Respond according to whether that API call worked
  if (res.status === 200) {
    return new Response(null, { status: 200 })
  } else {
    throw new Error(`Error signing up to mailing list: ${await res.text()}`)
  }
}
