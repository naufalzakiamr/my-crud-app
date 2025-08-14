// Storage utility for CRUD operations
const STORAGE_KEY = 'crud_users';

// Get all users
export const getUsers = () => {
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Save all users
export const saveUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

// Create a new user
export const createUser = (userData) => {
  try {
    const users = getUsers();
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

// Update a user
export const updateUser = (id, userData) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    saveUsers(users);
    return users[userIndex];
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

// Delete a user
export const deleteUser = (id) => {
  try {
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    saveUsers(filteredUsers);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
};

// Get a single user by ID
export const getUserById = (id) => {
  try {
    const users = getUsers();
    return users.find(user => user.id === id) || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};
