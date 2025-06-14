import React, { useState, Suspense, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Badge } from "@ui/badge";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import ImgUser from "@assets/img-user.jpg";
import "./App.css";

export default function App() {
  const [selectedUser, setSelectedUser] = useState();
  const [mockUsers, setUsers] = useState([]);

  const UserListMicroFrontend = React.lazy(() =>
    new Promise(resolve => {
      setTimeout(() => resolve(import("@components/user-list.jsx")), 500);
    })
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://randomuser.me/api/?results=12&nat=us");
      const data = await res.json();

      const formatted = data.results.map((user, index) => ({
        id: index + 1,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        avatar: user.picture.medium || ImgUser,
        role: "Rol aleatorio",
        location: `${user.location.city}, ${user.location.state}`,
        phone: user.phone,
        website: user.login.username + ".random.dev",
      }));

      setUsers(formatted);
    };

    fetchUsers();
  }, []);

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Directorio de usuarios
            </h1>
            <p className="text-gray-600">
              Navega y busca en nuestra base de datos de usuarios
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de usuarios */}
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
                      <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
                    </div>
                    <p className="text-sm text-gray-700 text-center">
                      <span className="text-black font-medium">Cargando...</span> Por favor, espere
                    </p>
                  </div>
                }
              >
                <UserListMicroFrontend
                  users={mockUsers}
                  onUserSelected={handleUserSelected}
                />
              </Suspense>
            </div>

            {/* Detalles de usuario */}
            <div className="lg:col-span-1">
              {selectedUser ? (
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <img
                        src={selectedUser.avatar || ImgUser}
                        alt={selectedUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {selectedUser.name}
                        </h3>
                        <Badge variant="secondary">{selectedUser.role}</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedUser.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>{selectedUser.website}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="sticky top-4">
                  <CardContent className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Mail className="w-8 h-8 text-gray-400" />
                      </div>
                      <p>Seleccione un usuario para ver los detalles</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
