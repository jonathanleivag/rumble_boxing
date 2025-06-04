"use client";

import { crearStudent } from "@/lib/db/actions/student.action";
import { FormUserComponentProps, IStudent } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";

const FormUserComponent: FC<FormUserComponentProps> = ({
  showAddForm,
  setShowAddForm,
  planes,
}) => {
  type FormValues = Omit<IStudent, "id">;

  const {
    isUploading,
    uploadProgress,
    error,
    uploadImage,
    reset: resetImageUpload,
  } = useImageUpload();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setLocalPreviewUrl(objectUrl);
    setValue("avatar", "pending");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      rut: "",
      plan: planes[0],
      createDate: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD para input date
      assistance: 0,
      status: "activo",
      avatar: "",
    },
  });

  const watchPlan = watch("plan");
  const watchPlanId = watchPlan?.id;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log("Procesando formulario...");

      const selectedDate = new Date(data.createDate);
      const today = new Date();
      const minDate = new Date("2000-01-01");

      let validDate = selectedDate;
      if (selectedDate > today) {
        validDate = today;
      } else if (selectedDate < minDate) {
        validDate = minDate;
      }

      const createDateISO = validDate.toISOString();

      let avatarUrl = "";
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      const dataCreateUser = await crearStudent({
        name: data.name,
        email: data.email,
        phone: data.phone,
        rut: data.rut,
        plan: data.plan._id,
        createDate: createDateISO,
        assistance: data.assistance,
        status: data.status,
        avatar: avatarUrl,
      });

      console.log("Usuario creado:", dataCreateUser);

      reset();
      resetImageUpload();
      setSelectedFile(null);
      setLocalPreviewUrl(null);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const cleanupPreview = () => {
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
      setLocalPreviewUrl(null);
    }
    setSelectedFile(null);
    setValue("avatar", "");
  };

  return (
    <AnimatePresence>
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm overflow-hidden mb-6"
        >
          <div className="p-5">
            <h2 className="font-oswald text-white text-lg mb-4">
              Añadir Nuevo Usuario
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Nombre Completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full bg-accent-dark/40 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="Nombre y apellidos"
                    {...register("name", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full bg-accent-dark/40 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="correo@ejemplo.com"
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full bg-accent-dark/40 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="+56 9 1234 5678"
                    {...register("phone", {
                      required: "El teléfono es obligatorio",
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i,
                        message: "Formato de teléfono inválido",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rut"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    RUT
                  </label>
                  <input
                    id="rut"
                    type="text"
                    className={`w-full bg-accent-dark/40 rounded-lg border ${
                      errors.rut ? "border-red-500" : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="12.345.678-9"
                    {...register("rut", {
                      required: "El RUT es obligatorio",
                      pattern: {
                        value: /^(\d{1,3}(?:\.\d{3}){2}-[\dkK])$/i,
                        message: "Formato de RUT inválido (ej: 12.345.678-9)",
                      },
                    })}
                  />
                  {errors.rut && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.rut.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="createDate"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Fecha de Ingreso
                  </label>
                  <input
                    id="createDate"
                    type="date"
                    className={`date-input w-full bg-accent-dark/40 rounded-lg border ${
                      errors.createDate
                        ? "border-red-500"
                        : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    {...register("createDate", {
                      required: "La fecha de ingreso es obligatoria",
                      validate: {
                        notInFuture: (value) => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0); // Reset the time to start of day for fair comparison
                          return (
                            selectedDate <= today ||
                            "La fecha no puede ser futura"
                          );
                        },
                        notTooOld: (value) => {
                          const selectedDate = new Date(value);
                          const minDate = new Date("2000-01-01");
                          return (
                            selectedDate >= minDate ||
                            "La fecha no puede ser anterior al año 2000"
                          );
                        },
                      },
                    })}
                    min="2000-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    style={{ colorScheme: "dark" }}
                  />
                  {errors.createDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.createDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="plan"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Plan
                  </label>
                  <select
                    id="plan"
                    className={`w-full bg-accent-dark/40 rounded-lg border ${
                      errors.plan ? "border-red-500" : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    value={watchPlanId}
                    onChange={(e) => {
                      const selectedPlan = planes.find(
                        (p) => p.id === e.target.value
                      );
                      if (selectedPlan) {
                        setValue("plan", selectedPlan);
                      }
                    }}
                  >
                    {planes.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.class} clases
                      </option>
                    ))}
                  </select>
                  {errors.plan && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.plan.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="asistencias"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Asistencias iniciales
                  </label>
                  <input
                    id="asistencias"
                    type="number"
                    className={`w-full bg-accent-dark/40 rounded-lg border ${
                      errors.assistance
                        ? "border-red-500"
                        : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="0"
                    min="0"
                    {...register("assistance", {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Las asistencias no pueden ser negativas",
                      },
                    })}
                  />
                  {errors.assistance && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.assistance.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="estado"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Estado
                  </label>
                  <select
                    id="estado"
                    className={`w-full bg-accent-dark/40 rounded-lg border ${
                      errors.status ? "border-red-500" : "border-accent-dark/40"
                    } text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    {...register("status", {
                      required: "El estado es obligatorio",
                    })}
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="suspendido">Suspendido</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="avatar"
                    className="block text-accent-medium font-montserrat text-xs mb-1"
                  >
                    Avatar
                  </label>
                  <div className="flex items-center space-x-4">
                    {localPreviewUrl ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-accent-dark/40 group">
                        <Image
                          src={localPreviewUrl}
                          alt="Avatar preview"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={cleanupPreview}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                          aria-label="Eliminar imagen"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-accent-dark/60">
                        <Image
                          src="https://res.cloudinary.com/dq8fpb695/image/upload/v1748900421/rumble/yfwwjdnhstzsmx2nuazq.webp"
                          alt="Avatar por defecto"
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileSelection(file);
                          }
                        }}
                      />
                      <input type="hidden" {...register("avatar")} />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("avatar-upload")?.click()
                        }
                        className={`${
                          isUploading
                            ? "bg-primary/50 cursor-not-allowed"
                            : "bg-accent-dark/60 hover:bg-accent-dark cursor-pointer"
                        } text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center`}
                        disabled={isUploading}
                      >
                        {isUploading && (
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                        {isUploading ? "Subiendo..." : "Seleccionar imagen"}
                      </button>
                      <p className="text-accent-medium text-xs mt-1">
                        Imagen opcional. Formatos: JPG, PNG, WebP (máx. 5MB)
                      </p>
                      {isUploading && uploadProgress > 0 && (
                        <div className="w-full mt-2">
                          <div className="h-1 w-full bg-accent-dark/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-300 rounded-full"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-accent-medium text-xs mt-1 text-right">
                            {Math.round(uploadProgress)}%
                          </p>
                        </div>
                      )}
                      {selectedFile && (
                        <p className="text-amber-500 text-xs mt-1">
                          Imagen seleccionada. Se subirá al guardar el usuario.
                        </p>
                      )}
                      {error && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    cleanupPreview();
                    setShowAddForm(false);
                  }}
                  className="bg-accent-dark/60 hover:bg-accent-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormUserComponent;
