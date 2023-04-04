const Company = require('../module/Company')

exports.AddCompany = async (req, res) => {
    const {name,description,website,location,jobs} = req.body;
    try {
        const company = new Company({
          name,
          description,
          website,
          location,
          jobs
        });
        const savedCompany = await company.save({ timeout: 20000 });
        res.status(201).json(savedCompany);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
  };
