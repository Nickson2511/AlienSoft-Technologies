export interface LoginPayload {
    username: string;
    password: string;
}



export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}



export async function loginAPI(payload: LoginPayload): Promise<LoginResponse> {
    const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });


    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data as LoginResponse;
}





