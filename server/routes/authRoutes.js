// Register route
router.post('/register', async (req, res) => {
  try {
    const { 
      name, email, password, phone, dateOfBirth,
      gender, maritalStatus, idNumber,
      county, subCounty, ward, village,
      bloodGroup, chronicConditions, allergies,
      isPregnant, numberOfChildren, childrenAgeBrackets
    } = req.body;
    
    console.log('Registration attempt for:', email);
    console.log('Received data:', { 
      name, email, 
      gender, maritalStatus, 
      county, subCounty 
    });

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email, password, and name' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create new user with all fields
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      dateOfBirth: dateOfBirth || null,
      
      // Personal Information
      gender: gender || '',
      maritalStatus: maritalStatus || '',
      idNumber: idNumber || '',
      
      // Location Information
      county: county || '',
      subCounty: subCounty || '',
      ward: ward || '',
      village: village || '',
      
      // Medical Information
      bloodGroup: bloodGroup || '',
      chronicConditions: chronicConditions || [],
      allergies: allergies || '',
      
      // Maternal & Child Health
      isPregnant: isPregnant || 'no',
      numberOfChildren: numberOfChildren || 0,
      childrenAgeBrackets: childrenAgeBrackets || []
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      idNumber: user.idNumber,
      county: user.county,
      subCounty: user.subCounty,
      ward: user.ward,
      village: user.village,
      bloodGroup: user.bloodGroup,
      chronicConditions: user.chronicConditions,
      allergies: user.allergies,
      isPregnant: user.isPregnant,
      numberOfChildren: user.numberOfChildren,
      childrenAgeBrackets: user.childrenAgeBrackets,
      role: user.role
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: messages.join(', ') 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration: ' + error.message 
    });
  }
});