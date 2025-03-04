import dotenv from dotenv

dotenv.config()

const base_url = process.env.BASE_URL

if(!base_url){
    throw new Error("Base URL is undefined")
}

export const CreateUser = async(formData) => {
    try {
        const response = await fetch(`${base_url}/users/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error("Creating User Failed")
        }

        const data = await response.json();

        return data.message
    } catch (error) {
        throw error
    }
}

export const LoginUser = async(formData) => {
    try {
        const response = await fetch(`${base_url}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error("Creating User Failed")
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);

        return 
    } catch (error) {
        throw error
    }
}

