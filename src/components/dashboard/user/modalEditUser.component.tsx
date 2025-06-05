"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ModalEditUserComponentProps } from "@/type";
import { useImageUpload } from "@/hooks/useImageUpload";
import { toast } from "react-hot-toast";
import { updateStudent } from "@/lib/db/actions/student.action";
import { Types } from "mongoose";
import { useAppDispatch } from "@/lib/redux/hooks";
import { updateStudent as updateStudentRedux } from "@/lib/redux/features/student/student.slice";

const ModalEditUserComponent: FC<ModalEditUserComponentProps> = ({
  setShowModal,
  usuarioEditado,
  showModal,
  setUsuarioEditado,
  planes,
}) => {
  const { uploadImage, isUploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target as Node)
      ) {
        // Cerrar el calendario si está abierto
        dateInputRef.current.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && usuarioEditado) {
      setSelectedImage(file);

      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSaveUser = async () => {
    if (!usuarioEditado) return;

    setIsSaving(true);

    try {
      let finalAvatarUrl = usuarioEditado.avatar;

      if (selectedImage) {
        const imageUrl = await uploadImage(selectedImage);
        if (imageUrl) {
          finalAvatarUrl = imageUrl;
        } else {
          throw new Error("Error al subir la imagen");
        }
      }

      let validCreateDate = usuarioEditado.createDate
        ? new Date(usuarioEditado.createDate)
        : new Date();

      const minDate = new Date("2000-01-01");
      const maxDate = new Date();

      if (validCreateDate < minDate) {
        validCreateDate = minDate;
      } else if (validCreateDate > maxDate) {
        validCreateDate = maxDate;
      }

      const formattedUser = {
        ...usuarioEditado,
        createDate: validCreateDate.toISOString(),
        avatar: finalAvatarUrl,
      };

      const fetchStudent = await updateStudent(formattedUser._id.toString(), {
        name: formattedUser.name,
        email: formattedUser.email,
        phone: formattedUser.phone,
        rut: formattedUser.rut,
        createDate: formattedUser.createDate,
        plan: new Types.ObjectId(formattedUser.plan._id),
        assistance: formattedUser.assistance,
        status: formattedUser.status,
        avatar: formattedUser.avatar,
      });

      dispatch(updateStudentRedux(fetchStudent));

      setSelectedImage(null);
      setImagePreview(null);

      toast.success("Usuario actualizado correctamente");
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      toast.error("Error al actualizar el usuario");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {showModal && usuarioEditado && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-accent-dark/30 shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bebas text-white text-2xl flex items-center">
                <span className="text-primary mr-2">•</span>
                DETALLES DE USUARIO
              </h3>
              <button
                className="text-accent-medium hover:text-white transition-colors cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 rounded-full z-10 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-montserrat font-semibold">
                      Cambiar imagen
                    </span>
                  </div>
                  <Image
                    src={imagePreview || (usuarioEditado.avatar as string)}
                    alt={usuarioEditado.name}
                    width={100}
                    height={100}
                    onClick={handleImageClick}
                    className={`w-24 h-24 rounded-full object-cover aspect-square relative z-10 cursor-pointer transition-shadow duration-300 ${
                      selectedImage
                        ? "ring-2 ring-yellow-500 shadow-md"
                        : "border-2 border-primary"
                    }`}
                  />
                  <button
                    onClick={handleImageClick}
                    className="absolute bottom-0 right-0 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white p-1.5 rounded-full z-20 transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    {selectedImage ? (
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M15 3h6v6" />
                          <path d="M10 14L21 3" />
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        </svg>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      </div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {(isUploading || (isSaving && selectedImage)) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full z-30">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                {selectedImage && (
                  <div className="text-xs text-yellow-500 mt-2 text-center animate-pulse font-semibold">
                    Imagen seleccionada - Se subirá al guardar cambios
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-accent-dark/30 to-accent-dark/10 p-5 rounded-lg border border-accent-dark/30 shadow-inner">
                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={usuarioEditado.name}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={usuarioEditado.email}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={usuarioEditado.phone}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    RUT
                  </label>
                  <input
                    type="text"
                    value={usuarioEditado.rut}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        rut: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Estado
                  </label>
                  <select
                    value={usuarioEditado.status}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        status: e.target.value as
                          | "activo"
                          | "inactivo"
                          | "suspendido",
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="suspendido">Suspendido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Plan
                  </label>
                  <select
                    value={usuarioEditado.plan._id.toString()}
                    onChange={(e) => {
                      const selectedPlan = planes.find(
                        (p) => p._id.toString() === e.target.value
                      );
                      if (selectedPlan) {
                        setUsuarioEditado({
                          ...usuarioEditado,
                          plan: selectedPlan,
                        });
                      }
                    }}
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {planes.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.class} clases
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Asistencias
                  </label>
                  <input
                    type="number"
                    value={usuarioEditado.assistance}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        assistance: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Fecha de Creación
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary-dark/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

                    <input
                      ref={dateInputRef}
                      type="date"
                      value={
                        usuarioEditado.createDate &&
                        !isNaN(new Date(usuarioEditado.createDate).getTime())
                          ? new Date(usuarioEditado.createDate)
                              .toISOString()
                              .split("T")[0]
                          : new Date().toISOString().split("T")[0]
                      }
                      min="2000-01-01"
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          createDate: e.target.value,
                        })
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onBlur={() => dateInputRef.current?.blur()}
                      className="relative z-10 w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 group-hover:border-primary/50 transition-colors duration-300"
                      style={{ colorScheme: "dark" }}
                    />

                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-full p-1.5 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3 h-3"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-accent-dark/30">
                <h4 className="font-oswald text-white text-lg mb-4 flex items-center">
                  <div className="w-1.5 h-6 bg-primary rounded-sm mr-2"></div>
                  Detalles del Plan
                </h4>
                <div className="bg-gradient-to-br from-accent-dark/40 to-accent-dark/20 rounded-lg p-5 shadow-lg border border-accent-dark/40">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-oswald text-lg">
                      {usuarioEditado.plan.name}
                    </span>
                    <span className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs px-3 py-1 rounded-full font-oswald shadow-sm">
                      {usuarioEditado.plan.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-accent-dark/30 p-3 rounded-lg text-center">
                      <div className="text-accent-medium font-montserrat text-xs mb-1">
                        Total
                      </div>
                      <div className="text-white font-oswald text-lg">
                        {usuarioEditado.plan.class}
                      </div>
                    </div>
                    <div className="bg-accent-dark/30 p-3 rounded-lg text-center">
                      <div className="text-accent-medium font-montserrat text-xs mb-1">
                        Usadas
                      </div>
                      <div className="text-white font-oswald text-lg">
                        {usuarioEditado.assistance}
                      </div>
                    </div>
                    <div className="bg-accent-dark/30 p-3 rounded-lg text-center">
                      <div className="text-accent-medium font-montserrat text-xs mb-1">
                        Restantes
                      </div>
                      <div className="text-white font-oswald text-lg">
                        {usuarioEditado.plan.class === "ilimitado"
                          ? "∞"
                          : Math.max(
                              0,
                              Number(usuarioEditado.plan.class) -
                                usuarioEditado.assistance
                            )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="relative w-full h-3 bg-accent-dark/60 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-dark"
                        style={{
                          width:
                            usuarioEditado.plan.class === "ilimitado"
                              ? "100%"
                              : `${Math.min(
                                  100,
                                  (usuarioEditado.assistance /
                                    Number(usuarioEditado.plan.class)) *
                                    100
                                )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-accent-medium">0%</div>
                      <div className="text-xs font-semibold text-primary">
                        {usuarioEditado.plan.class === "ilimitado"
                          ? "∞"
                          : Math.min(
                              100,
                              Math.round(
                                (usuarioEditado.assistance /
                                  Number(usuarioEditado.plan.class)) *
                                  100
                              )
                            )}
                        % utilizado
                      </div>
                      <div className="text-xs text-accent-medium">100%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-accent-dark/40 pt-6 mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer bg-accent-dark/60 hover:bg-accent-dark text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md"
                  disabled={isSaving}
                >
                  Cerrar
                </button>
                <button
                  onClick={handleSaveUser}
                  className="cursor-pointer bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalEditUserComponent;
