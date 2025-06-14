/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { Card, CardContent } from "@ui/card";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { Search, ChevronLeft, ChevronRight, Users } from "lucide-react";
import ImgUser from "@assets/img-user.jpg";

export default function UserListMicroFrontend({ users, onUserSelected }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUserClick = (user) => {
    onUserSelected(user);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Buscador */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">
                  Usuarios ({filteredUsers.length})
                </h2>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Busca usuarios por su nombre, correo o rol..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu de usuarios */}
        {currentUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentUsers.map((user) => (
              <Card
                key={user.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-blue-300"
                onClick={() => handleUserClick(user)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={user.avatar || ImgUser}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {user.email}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {user.role}
                        </Badge>
                        <span className="text-xs text-gray-500 truncate ml-2">
                          {user.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium">
                  No se encontraron usuarios
                </p>
                <p className="text-sm">
                  Intente ajustar sus criterios de búsqueda
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a{" "}
                  {Math.min(endIndex, filteredUsers.length)} de{" "}
                  {filteredUsers.length} usuarios
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
