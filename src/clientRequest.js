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

export const ChangeEmail = async (formData) => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${base_url}/users/change-email`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error changing email')
    }

    localStorage.removeItem('token')

    return
  } catch (error) {
    throw error
  }
}

export const ChangeUserInfo = async (formData) => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${base_url}/users/change-user-info`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error changing information')
    }

    return data
  } catch (error) {
    throw error
  }
}

export const GetUserInfo = async () => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${base_url}/users/info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error retrieving information')
    }

    return data
  } catch (error) {
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${base_url}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${base_url}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  } catch (error) {
    throw error
  }
}
