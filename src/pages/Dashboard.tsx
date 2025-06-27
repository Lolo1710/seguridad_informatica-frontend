import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [user, setUser] = useState({
        matricula: '',
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        programa: '',
        cuatrimestre: ''
    });
    const navigate = useNavigate();
    const getNombrePrograma = (codigo: string) => {
        switch (codigo) {
            case 'IS': return 'Ingeniería en Software';
            case 'F': return 'Fisioterapia';
            case 'IF': return 'Ingeniería Financiera';
            case 'IB': return 'Ingeniería Biomédica';
            case 'IBT': return 'Ingeniería en Biotecnología';
            case 'A': return 'Administración';
            case 'IC': return 'Ingeniería Civil';
            default: return codigo;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/api/users/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);

    if (!user) {
        return <p className="text-center mt-10">Cargando...</p>;
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h2 className='text-2xl font-bold mb-4'>Bienvenido {user.nombres}</h2>
            <div className='bg-white shadow p-6 rounded-lg w-full max-w-md'>
                <p><strong>Matrícula:</strong> {user.matricula}</p>
                <p><strong>Nombres:</strong> {user.nombres}</p>
                <p><strong>Apellidos:</strong> {user.apellidos}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.telefono}</p>
                <p><strong>Programa:</strong> {getNombrePrograma(user.programa)}</p>
                <p><strong>Cuatrimestre:</strong> {user.cuatrimestre}</p>
            </div>

            <button
                className='bg-red-500 text-white p-2 rounded-2xl w-1/2 hover:bg-red-200 cursor-pointer mt-6'
                onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}