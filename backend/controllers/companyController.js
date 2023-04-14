const Company = require('../module/Company')
const User = require('../module/users');
exports.AddCompany = async (req, res) => {
  const { name, description, website, location, jobs } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user already has a company
    const existingCompany = await Company.findOne({ userId: user._id });
    if (existingCompany) {
      return res.status(400).json({ message: 'User already has a company' });
    }

    const company = new Company({
      userId: user._id,
      name,
      description,
      website,
      location,
      jobs,
    });
    const savedCompany = await company.save({ timeout: 20000 });
    res.status(201).json(savedCompany);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
  };
  exports.getcompanyById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const company = await Company.findOne({ userId: userId }).populate('userId');
  
      if (!company) {
        return res.status(404).json({
          message: 'company not found'
        });
      }
      res.setHeader('Content-Disposition', 'inline');
      res.status(200).json({
        message: 'company found',
        company: company
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get company',
        error: error
      });
    }
    };