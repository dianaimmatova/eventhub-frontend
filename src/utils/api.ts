export function refreshTokens() {
    const token = localStorage.getItem('refreshToken')
    if (!token) {
        return Promise.resolve(false)
    }

    return fetch('http://localhost:3000/auth/refresh', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken: token }) })
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

function sendWithToken(url: string, options?: RequestInit) {
    const token = localStorage.getItem('accessToken')
    return fetch(url, {
        ...options,
        headers: { ...options?.headers, 'Authorization': `Bearer ${token}` }
    })
}

export function authFetch(url: string, options?: RequestInit) {
    return sendWithToken(url, options).then(response => {
        if (response.status !== 401) {
            return response
        }
        return refreshTokens().then(ok => {
            if (ok) {
                return sendWithToken(url, options)
            }
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            window.location.href = '/login'
            return response

        })

    })
}