import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            alert('Mensaje: ' + res.data.message);
            setUserId(res.data.userId);
            setStep(2);
        } catch (err) {
            let message = 'Error desconocido';
            if (typeof err === 'object' && err !== null) {
                if ('response' in err && typeof (err as any).response?.data?.message === 'string') {
                    message = (err as any).response.data.message;
                    alert('Mensaje: ' + message);
                } else if ('message' in err && typeof (err as any).message === 'string') {
                    message = (err as any).message;
                    alert('Mensaje: ' + message);
                }
            }
        }
    };

    const goTo2FA = () => {
        navigate('/verify-2fa', { state: { userId } });
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h2 className='text-2xl font-bold mb-4'>Iniciar Sesión</h2>
            {step === 1 ? (
                <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col items-center'>
                    <input className='border p-2 mb-2 w-full rounded-2xl' value={email} type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input className='border p-2 mb-2 w-full rounded-2xl' value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
                    <p className='text-gray-600 mb-4'>¿No tienes una cuenta? <Link to="/register" className='text-blue-500'>Registrarse</Link></p>
                    <button className='bg-blue-500 text-white p-2 rounded-2xl w-1/2 hover:bg-blue-200 cursor-pointer' onClick={handleLogin}>
                        Enviar
                    </button>
                </div>
            ) : (
                <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col items-center'>
                    <p className='text-gray-600 mb-4'>Verifica tu código de 2FA enviado</p>
                    <button className='bg-blue-500 text-white p-2 rounded' onClick={goTo2FA}>Ir a Verificación 2FA</button>
                </div>
            )}
        </div>
    );
}