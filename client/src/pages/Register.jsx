import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    idNumber: '',
    
    // Location Information
    county: '',
    subCounty: '',
    ward: '',
    village: '',
    
    // Medical Information
    bloodGroup: '',
    chronicConditions: [],
    allergies: '',
    
    // Maternal & Child Health
    isPregnant: '',
    numberOfChildren: '',
    childrenAgeBrackets: [],
    
    // Contact Information
    email: '',
    phone: '',
    
    // Security
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Options for dropdowns
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];
  const chronicConditionsOptions = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'HIV/AIDS',
    'Cancer',
    'Arthritis',
    'Epilepsy',
    'Thyroid Disorder',
    'None'
  ];
  const childrenAgeBracketsOptions = [
    '0-6 months',
    '7-12 months', 
    '1-2 years',
    '3-5 years',
    '6-12 years',
    '13-18 years'
  ];
  const countyOptions = [
    'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta',
    'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru',
    'Tharaka Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua',
    'Nyeri', 'Kirinyaga', 'Murang\'a', 'Kiambu', 'Turkana', 'West Pokot',
    'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet', 'Nandi',
    'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho',
    'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya',
    'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira', 'Nairobi'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'chronicConditions' || name === 'childrenAgeBrackets') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Prepare data for API
      const userData = {
        // Personal Information
        name: formData.name,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        dateOfBirth: formData.dateOfBirth,
        idNumber: formData.idNumber,
        
        // Location Information
        location: {
          county: formData.county,
          subCounty: formData.subCounty,
          ward: formData.ward,
          village: formData.village
        },
        
        // Medical Information
        medicalInfo: {
          bloodGroup: formData.bloodGroup,
          chronicConditions: formData.chronicConditions,
          allergies: formData.allergies
        },
        
        // Maternal & Child Health
        maternalChildHealth: {
          isPregnant: formData.isPregnant,
          numberOfChildren: parseInt(formData.numberOfChildren) || 0,
          childrenAgeBrackets: formData.childrenAgeBrackets
        },
        
        // Contact Information
        email: formData.email,
        phone: formData.phone,
        
        // Security
        password: formData.password
      };

      // Call register API
      const response = await authAPI.register(userData);
      
      if (response.success) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to home page
        navigate('/');
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <span className="text-white text-2xl">❤️</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join HealthLink
          </h1>
          <p className="text-gray-600 text-lg">
            Create your account to start your health journey
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information Section */}
            <div className="border-2 border-green-200 rounded-xl p-5 bg-green-50/30">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <span className="text-green-600 text-lg">👤</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Marital Status */}
                <div>
                  <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status
                  </label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">Select Marital Status</option>
                    {maritalStatusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-700"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* ID Number */}
                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    ID Number / Passport
                  </label>
                  <input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="Enter ID or Passport number"
                    value={formData.idNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Location Information Section */}
            <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50/30">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <span className="text-blue-600 text-lg">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Location Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* County */}
                <div>
                  <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
                    County
                  </label>
                  <select
                    id="county"
                    name="county"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    value={formData.county}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">Select County</option>
                    {countyOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Sub-County */}
                <div>
                  <label htmlFor="subCounty" className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-County
                  </label>
                  <input
                    id="subCounty"
                    name="subCounty"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="Enter sub-county"
                    value={formData.subCounty}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* Ward */}
                <div>
                  <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
                    Ward
                  </label>
                  <input
                    id="ward"
                    name="ward"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="Enter ward"
                    value={formData.ward}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* Village */}
                <div>
                  <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                    Village
                  </label>
                  <input
                    id="village"
                    name="village"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="Enter village"
                    value={formData.village}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="border-2 border-red-200 rounded-xl p-5 bg-red-50/30">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <span className="text-red-600 text-lg">🏥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Medical Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Blood Group */}
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroupOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Allergies */}
                <div>
                  <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </label>
                  <input
                    id="allergies"
                    name="allergies"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="List any allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* Chronic Conditions */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chronic Conditions
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-white border border-gray-300 rounded-lg">
                    {chronicConditionsOptions.map(condition => (
                      <label key={condition} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="chronicConditions"
                          value={condition}
                          checked={formData.chronicConditions.includes(condition)}
                          onChange={handleChange}
                          disabled={isLoading}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Maternal & Child Health Section */}
            <div className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50/30">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <span className="text-purple-600 text-lg">👶</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Maternal & Child Health</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Are you pregnant? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you currently pregnant?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPregnant"
                        value="yes"
                        checked={formData.isPregnant === 'yes'}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPregnant"
                        value="no"
                        checked={formData.isPregnant === 'no'}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {/* Number of Children */}
                <div>
                  <label htmlFor="numberOfChildren" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Children
                  </label>
                  <select
                    id="numberOfChildren"
                    name="numberOfChildren"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white"
                    value={formData.numberOfChildren}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">Select Number</option>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Children's Age Brackets */}
                {parseInt(formData.numberOfChildren) > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Children's Age Brackets
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-white border border-gray-300 rounded-lg">
                      {childrenAgeBracketsOptions.map(bracket => (
                        <label key={bracket} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="childrenAgeBrackets"
                            value={bracket}
                            checked={formData.childrenAgeBrackets.includes(bracket)}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{bracket}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="border-2 border-yellow-200 rounded-xl p-5 bg-yellow-50/30">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                  <span className="text-yellow-600 text-lg">📧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 placeholder-gray-400 bg-white"
                    placeholder="+254 XXX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="border-2 border-indigo-200 rounded-xl p-5 bg-indigo-50/30">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <span className="text-indigo-600 text-lg">🔒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Account Security</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 bg-white pr-12"
                      placeholder="Create password (min. 6 characters)"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      <span className="text-lg">
                        {showPassword ? '🙈' : '👁️'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 bg-white pr-12"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      <span className="text-lg">
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Agreement Section */}
            <div className="border-2 border-orange-200 rounded-xl p-5 bg-orange-50/30">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <span className="text-orange-600 text-lg">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Terms & Agreement</h3>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-orange-600 hover:text-orange-500 font-medium underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-orange-600 hover:text-orange-500 font-medium underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create your account'
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-semibold underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 HealthLink Kilifi. Your partner in maternal and child health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;