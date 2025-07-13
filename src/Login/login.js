import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './login.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from "react-toastify";



function LoginRegisterTabs() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState(null);

  const handleLogin = () => {
     if (!email || !password) {
    toast.error("Lütfen tüm alanları doldurun!");
    return;
  }

    axios
      .post('http://localhost:8080/api/auth/login', { email, password })
      .then((res) => setMsg(res.data))
      .catch((err) => setMsg('Hata: ' + err.message));
  };

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !fullName || !userName || !gender || !birthDate) {
    toast.error("Lütfen tüm alanları doldurun!");
    return;
  }

    axios
      .post('http://localhost:8080/api/auth/register', {
        email,
        password,
        fullName,
        userName,
        role,
        acceptedTerms,
        gender,
        birthDate
      })
      .then((res) => setMsg(res.data))
      .catch((err) => setMsg('Hata: ' + err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(activeTab === "register"){
      if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor!");
      return;
      } 
      handleRegister();
    }else{
      handleLogin();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => {
              setEmail('');setPassword('');
              setActiveTab('login')
            }}
            className={`flex-1 py-2 text-center ${activeTab === 'login'
              ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold'
              : 'text-gray-600'
              }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() =>{
              setEmail('');setPassword(''); 
              setActiveTab('register')
            }}
            className={`flex-1 py-2 text-center ${activeTab === 'register'
              ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold'
              : 'text-gray-600'
              }`}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Form (ortak ve kayıt özel alanlarıyla birlikte) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">İsim Soyisim</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Bir kullanıcı adı seçin"
                />
              </div>

              <div className="flex items-start justify-between gap-4 w-full">
                {/* Doğum günü */}
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium text-gray-700 mb-1">Doğum günü</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={birthDate}
                        onChange={(newBirth) => setBirthDate(newBirth)}
                        slotProps={{ textField: { size: "small", fullWidth: true } }} />
                  </LocalizationProvider>
                  
                </div>

                {/* Cinsiyet */}
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium text-gray-700 mb-1">Cinsiyet</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>
                </>
          )}

         {/* Giriş ve ortak alanlar */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email adresiniz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              autoComplete="current-password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifreniz"
            />
          </div>

            {activeTab === 'register' && (

              <>
              <div className='relative'>
                <label className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifrenizi tekrar girin"
                />
                {confirmPassword && confirmPassword !== password && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-64 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded shadow-md text-sm animate-fade-in">
                    ❗ Şifreler eşleşmiyor
                </div>
                )}
              </div>


              <div className='flex'>
                <div className='w-1/2'>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <label className="swap">
                  <input
                    type="checkbox"
                    className='mr-2'
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.checked ? "admin" : "user")}
                  />
                  <div className="swap-on">ADMİN</div>
                  <div className="swap-off">KULLANICI</div>
                </label>
                </div>
                <div className='w-1/2 '>
                <FormGroup className='bottom-0'>
                  <FormControlLabel
                    required control={
                      <Checkbox
                      />
                    }
                    label="Kabul ediyorum" />
                </FormGroup>
                </div>
              </div>
          </>
            )}
          <ToastContainer />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md"
          >
            {activeTab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>

          {msg && <p className="mt-2 text-sm text-center text-red-600">{msg}</p>}
        </form>
      </div>
    </div>

  );
}

export default LoginRegisterTabs;
