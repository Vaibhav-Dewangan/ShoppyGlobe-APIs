import User from '../Models/User.js';

// GET /user/: Fetch details of a single user by its ID.
export const getUserById = async (req, res)=>{
    try{
        const email = req.params.email;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
};

// GET /users: Fetch a list of users from MongoDB.
export const getUsers = async (req, res)=>{
  try{
      const users = await User.find();
      res.status(200).json(users);
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
};