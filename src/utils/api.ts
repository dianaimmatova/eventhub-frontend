export function refreshTokens() {
    const token = localStorage.getItem('refreshToken')
    if (!token) {
        return Promise.resolve(false)
    }

    return fetch('http://localhost:3000/auth/refresh', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ refreshToken: token }) })
        .then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    localStorage.setItem('accessToken', data.accessToken)
                    localStorage.setItem('refreshToken', data.refreshToken)
                    return true
                }) 
            }  
            return false 
        })
        .catch(() => false)

}

