import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        matricula: '',
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        programa: '',
        cuatrimestre: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { matricula, nombres, apellidos, email, telefono, programa, cuatrimestre } = formData;
        const errors: string[] = [];

        if (!/^\d{9}$/.test(matricula)) errors.push('Matrícula debe tener exactamente 9 dígitos.');
        if (!nombres.trim()) errors.push('Nombres es obligatorio.');
        if (!apellidos.trim()) errors.push('Apellidos es obligatorio.');
        if (!/^\d{9}@upqroo\.edu\.mx$/.test(email)) errors.push('Email debe ser del tipo #########@upqroo.edu.mx');
        if (!/^\d{10}$/.test(telefono)) errors.push('Teléfono debe contener exactamente 10 dígitos.');
        if (!['IS', 'F', 'IF', 'IB', 'IBT', 'A', 'IC'].includes(programa)) 
            errors.push('Programa no válido.');
        if (!/^(10|[1-9])$/.test(cuatrimestre)) errors.push('Cuatrimestre debe estar entre 1 y 10.');

        return errors;
    };

    const handleSubmit = async () => {
        const errors = validateForm();
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/users/register/', formData);

            if (res.status === 201) {
                alert(res.data.message);
                navigate('/login');
            } else {
                throw new Error(res.data.message);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert('Error al registrar: ' + (err.response?.data.message || err.message));
            } else if (err instanceof Error) {
                alert('Error al registrar: ' + err.message);
            } else {
                alert('Error al registrar.');
            }
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h2 className='text-2xl font-bold mb-4'>Registro de Usuario</h2>

            <input
                name='matricula'
                value={formData.matricula}
                onChange={handleChange}
                placeholder='Matrícula'
                className='border p-2 mb-2 w-1/3 rounded-2xl'
                type='number'
            />

            <input
                name='nombres'
                value={formData.nombres}
                onChange={handleChange}
                placeholder='Nombres'
                className='border p-2 mb-2 w-1/3 rounded-2xl'
                type='text'
            />

            <input
                name='apellidos'
                value={formData.apellidos}
                onChange={handleChange}
                placeholder='Apellidos'
                className='border p-2 mb-2 w-1/3 rounded-2xl'
                type='text'
            />

            <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email institucional'
                className='border p-2 mb-2 w-1/3 rounded-2xl'
                type='email'
            />

            <input
                name='telefono'
                value={formData.telefono}
                onChange={handleChange}
                placeholder='Teléfono'
                className='border p-2 mb-2 w-1/3 rounded-2xl'
                type='text'
            />

            <select
                name='programa'
                value={formData.programa}
                onChange={handleChange}
                className='border p-2 mb-2 w-1/3 rounded-2xl'
            >
                <option value=''>Seleccione un programa</option>
                <option value='IS'>Ingeniería en Software</option>
                <option value='F'>Fisioterapia</option>
                <option value='IF'>Ingeniería Financiera</option>
                <option value='IB'>Ingeniería Biomédica</option>
                <option value='IBT'>Ingeniería Biotecnología</option>
                <option value='A'>Administración</option>
                <option value='IC'>Ingeniería Civil</option>
            </select>

            <select
                name='cuatrimestre'
                value={formData.cuatrimestre}
                onChange={handleChange}
                className='border p-2 mb-2 w-1/3 rounded-2xl'
            >
                <option value=''>Seleccione un cuatrimestre</option>
                {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
            </select>

            <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Contraseña'
                className='border p-2 mb-2 w-1/3 rounded-2xl'
                type='password'
            />

            <p className='text-gray-600 mb-4'>
                ¿Ya tienes una cuenta? <Link to='/login' className='text-blue-500'>Iniciar Sesión</Link>
            </p>

            <button
                className='bg-blue-500 text-white p-2 rounded-2xl w-1/3 hover:bg-blue-200 cursor-pointer'
                onClick={handleSubmit}
            >
                Registrar
            </button>
        </div>
    );
}