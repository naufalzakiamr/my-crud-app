import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Tambahkan ini
import FormInput from './components/FormInput';
import ListItem from './components/ListItem';
import { getUsers, createUser, updateUser, deleteUser } from './utils/storage';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dragMode, setDragMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const loadedUsers = getUsers();
    setUsers(loadedUsers);
  };

  const handleCreateUser = (userData) => {
    const newUser = createUser(userData);
    if (newUser) {
      loadUsers();
      setShowForm(false);
      showNotification('Pengguna berhasil ditambahkan!', 'success');
    } else {
      showNotification('Gagal menambahkan pengguna!', 'error');
    }
  };

  const handleUpdateUser = (userData) => {
    const updatedUser = updateUser(editingUser.id, userData);
    if (updatedUser) {
      loadUsers();
      setEditingUser(null);
      setShowForm(false);
      showNotification('Pengguna berhasil diperbarui!', 'success');
    } else {
      showNotification('Gagal memperbarui pengguna!', 'error');
    }
  };

  const handleDeleteUser = (userId) => {
    const success = deleteUser(userId);
    if (success) {
      loadUsers();
      showNotification('Pengguna berhasil dihapus!', 'success');
    } else {
      showNotification('Gagal menghapus pengguna!', 'error');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const showNotification = (message, type) => {
    // Simple notification - you can enhance this with a proper notification library
    alert(message);
  };

  // Fungsi drag & drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newUsers = Array.from(users);
    const filteredIds = filteredAndSortedUsers.map(u => u.id);
    const draggedId = filteredIds[result.source.index];
    const draggedIndex = users.findIndex(u => u.id === draggedId);
    const [removed] = newUsers.splice(draggedIndex, 1);
    const destinationId = filteredIds[result.destination.index];
    const destinationIndex = users.findIndex(u => u.id === destinationId);
    newUsers.splice(destinationIndex, 0, removed);
    setUsers(newUsers);
  };

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      } else {
        aValue = aValue || '';
        bValue = bValue || '';
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <div className="container mx-auto px-4 py-8">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors duration-200 
              ${darkMode ? 'bg-yellow-400' : 'bg-gray-300'} 
              hover:bg-yellow-500 focus:outline-none`}
            title={darkMode ? 'Matikan Dark Mode' : 'Aktifkan Dark Mode'}
          >
            {darkMode ? (
              // Ikon matahari
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <path stroke="currentColor" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              // Ikon bulan
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          {/* Drag Mode Toggle */}
          <button
            onClick={() => setDragMode(!dragMode)}
            className={`p-2 rounded-full transition-colors duration-200 
              ${dragMode ? 'bg-green-600' : 'bg-gray-300'} 
              hover:bg-green-700 focus:outline-none`}
            title={dragMode ? 'Matikan Drag Mode' : 'Aktifkan Drag Mode'}
          >
            {dragMode ? (
              // Ikon close
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ikon drag
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="5" cy="5" r="2" />
                <circle cx="12" cy="5" r="2" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="12" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
              </svg>
            )}
          </button>
        </div>

        {/* Judul dan deskripsi aplikasi */}
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Aplikasi CRUD Pengguna
        </h1>
        <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Kelola data pengguna dengan mudah - Create, Read, Update, Delete
        </p>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Pengguna
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="createdAt-desc">Terbaru</option>
                <option value="createdAt-asc">Terlama</option>
                <option value="name-asc">Nama A-Z</option>
                <option value="name-desc">Nama Z-A</option>
                <option value="email-asc">Email A-Z</option>
                <option value="email-desc">Email Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-6">
            <FormInput
              user={editingUser}
              onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        <div className="space-y-4">
          {dragMode ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="users-list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {filteredAndSortedUsers.map((user, index) => (
                      <Draggable key={user.id} draggableId={user.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              cursor: 'grab', // Tambahkan agar kursor berubah saat drag
                            }}
                          >
                            <ListItem
                              user={user}
                              onEdit={handleEditUser}
                              onDelete={handleDeleteUser}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <>
              {filteredAndSortedUsers.map((user) => (
                <ListItem
                  key={user.id}
                  user={user}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
