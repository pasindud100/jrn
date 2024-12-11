import User from "../../models/userModel.js"; // Adjust the path as needed

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Create a new user (grant access)
export const createUser  = async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      const newUser  = new User({ username, password, role, status: "active" }); // Set status to active
      await newUser .save();
      res.status(201).json(newUser );
    } catch (error) {
      res.status(500).json({ message: "Failed to create user", error });
    }
  };


// Handle Edit User Access
export const editUserAccess = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password, role } = req.body;

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, password, role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error editing user access:", error);
    res.status(500).send("Server error");
  }
};

// Handle Delete User Access
export const deleteUserAccess = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and delete the user
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Server error");
  }
};

