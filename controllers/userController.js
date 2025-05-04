
const User = require('../models/User');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    const {email, password, access} = req.body;
    bcrypt.hash(password, 10)
   .then(hash => {
      const user = new User({
        email: email,
        password: hash,
        access: access
      });
      user.save()
        .then(() => res.status(201).json({ message: 'New user signed up' }))
        .catch(error => res.status(400).json({ 
            message: "Error when signing up new user",
            error: error 
        }));
    })
    .catch(error => res.status(500).json({ 
        message: "Error when hahsing password",
        error: error
     }));

};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Login/password incorrect'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Login/password incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( //encodes the token so we are sure the FE can verify that this is the same user logged in
                            {userId: user._id, access: user.access},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ 
                    message: "Error when loging in",
                    error: error
                }));
        })
        .catch(error => res.status(500).json({ 
            message: "Error when finding user email",
            error: error
         }));
 };

 exports.getAllUsers = (req, res) => {
    User.find().then(
      (users) => {
        res.status(200).json(users);
      }
    ).catch(
      (error) => {
        res.status(400).json(
            { message: "Error when getting all users",
                error: error
              });
      }
    );
  }

  exports.modifyUser =  async (req, res) => {
    try {
          const { id } = req.params;
                   
          const updateData = { ...req.body }; // Copy request data
          
          // Ensure _id is not included in the update (just in case)
          delete updateData._id;
      
          const result = await User.updateOne(
              { _id: id },  // Find by id
              { $set: updateData },  // Update only the provided fields
              { runValidators: true }
          );
          
          if (!result || result.matchedCount == 0) {
              return res.status(404).json({ message: "User not found" });
          }
      
          res.json({ message: "User updated successfully", modifiedCount: result.modifiedCount });
      
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error updating user", error: error.message });
        }
  }
  