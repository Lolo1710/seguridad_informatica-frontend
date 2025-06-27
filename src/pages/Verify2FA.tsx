import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Verify2FA() {
    const [token, setToken] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId;

    const handleVerify = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/verify-2fa', { userId, token });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert("Mensaje: " + (err as any).response?.data?.message || 'Error desconocido');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h2 className='text-2xl font-bold mb-4'>Verificación 2FA</h2>
            <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Código de Verificación" className='border p-2 mb-2 w-1/3 rounded-2xl' />
            <button onClick={handleVerify} className='bg-blue-500 text-white p-2 rounded-2xl w-1/3 hover:bg-blue-200 cursor-pointer'>Verificar</button>
        </div>
    );
}