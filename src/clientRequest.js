const base_url = import.meta.env.VITE_BASE_URL

if (!base_url) {
  throw new Error('Base URL is undefined')
}

export const CreateUser = async (formData) => {
  try {
    const response = await fetch(`${base_url}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Creating User Failed')
    }

    return data
  } catch (error) {
    throw error
  }
}

export const LoginUser = async (formData) => {
  try {
    const response = await fetch(`${base_url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Creating User Failed')
    }

    localStorage.setItem('token', data.token)

    return
  } catch (error) {
    throw error
  }
}

export const LogoutUser = async () => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${base_url}/users/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error logging out')
    }

    localStorage.removeItem('token')

    return
  } catch (error) {
    throw error
  }
}

export const ChangePassword = async (formData) => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${base_url}/users/change-password`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error changing password')
    }

    localStorage.removeItem('token')

    return
  } catch (error) {
    throw error
  }
}
