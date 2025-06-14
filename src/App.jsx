import React, { useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Badge } from "@ui/badge";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import ImgUser from "@assets/img-user.jpg";
import "./App.css";

export default function App() {
  const [selectedUser, setSelectedUser] = useState();

  const UserListMicroFrontend = React.lazy(() =>
    new Promise(resolve => {
      setTimeout(() => resolve(import("@components/user-list.jsx")), 1500);
    })
  );

  const mockUsers = [
    {
      id: 1,
      name: "Camila Rodríguez",
      email: "camila.rodriguez@example.com",
      avatar: ImgUser,
      role: "Desarrolladora Frontend",
      location: "Bogotá, Cundinamarca",
      phone: "+57 301 234 5678",
      website: "camilarod.dev",
    },
    {
      id: 2,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      avatar: ImgUser,
      role: "Desarrollador Backend",
      location: "Medellín, Antioquia",
      phone: "+57 301 234 5678",
      website: "juanbackend.co",
    },
    {
      id: 3,
      name: "Laura Gómez",
      email: "laura.gomez@example.com",
      avatar: ImgUser,
      role: "Diseñadora UI/UX",
      location: "Cali, Valle del Cauca",
      phone: "+57 301 234 5678",
      website: "lauragomez.design",
    },
    {
      id: 4,
      name: "Carlos Ramírez",
      email: "carlos.ramirez@example.com",
      avatar: ImgUser,
      role: "Ingeniero DevOps",
      location: "Barranquilla, Atlántico",
      phone: "+57 301 234 5678",
      website: "carlosdevops.com",
    },
    {
      id: 5,
      name: "Mariana Torres",
      email: "mariana.torres@example.com",
      avatar: ImgUser,
      role: "Product Manager",
      location: "Bucaramanga, Santander",
      phone: "+57 301 234 5678",
      website: "marianapm.co",
    },
    {
      id: 6,
      name: "Andrés Herrera",
      email: "andres.herrera@example.com",
      avatar: ImgUser,
      role: "Científico de Datos",
      location: "Pereira, Risaralda",
      phone: "+57 301 234 5678",
      website: "andresdata.com",
    },
    {
      id: 7,
      name: "Valentina Mejía",
      email: "valentina.mejia@example.com",
      avatar: ImgUser,
      role: "Desarrolladora Mobile",
      location: "Manizales, Caldas",
      phone: "+57 301 234 5678",
      website: "valentinamobile.co",
    },
    {
      id: 8,
      name: "Santiago López",
      email: "santiago.lopez@example.com",
      avatar: ImgUser,
      role: "Ingeniero de Seguridad",
      location: "Cartagena, Bolívar",
      phone: "+57 301 234 5678",
      website: "santiseguridad.com",
    },
    {
      id: 9,
      name: "Daniela Castro",
      email: "daniela.castro@example.com",
      avatar: ImgUser,
      role: "Ingeniera QA",
      location: "Ibagué, Tolima",
      phone: "+57 301 234 5678",
      website: "danielaqa.co",
    },
    {
      id: 10,
      name: "Felipe Martínez",
      email: "felipe.martinez@example.com",
      avatar: ImgUser,
      role: "Desarrollador Full Stack",
      location: "Villavicencio, Meta",
      phone: "+57 301 234 5678",
      website: "felipefs.dev",
    },
    {
      id: 11,
      name: "Natalia Ruiz",
      email: "natalia.ruiz@example.com",
      avatar: ImgUser,
      role: "Redactora Técnica",
      location: "Cúcuta, Norte de Santander",
      phone: "+57 301 234 5678",
      website: "nataliaruiz.tech",
    },
    {
      id: 12,
      name: "Sebastián Morales",
      email: "sebastian.morales@example.com",
      avatar: ImgUser,
      role: "Arquitecto Cloud",
      location: "Neiva, Huila",
      phone: "+57 301 234 5678",
      website: "sebcloud.com",
    },
  ];

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
