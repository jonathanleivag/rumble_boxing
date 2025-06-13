import { ConfirmOptions } from "@/type";
import { toast } from "react-hot-toast";

export const showConfirmToast = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmOptions) => {
  toast(
    (t) => (
      <div className="text-white font-montserrat text-sm space-y-2">
        <p>{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-oswald"
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              if (onCancel) onCancel();
            }}
            className="cursor-pointer bg-accent-dark/40 hover:bg-accent-dark/60 text-white px-3 py-1 rounded text-xs font-oswald"
          >
            Cancelar
          </button>
        </div>
      </div>
    ),
    { duration: 10000, position: "top-center" }
  );
};

/*

<div className="">
          <p>¿Estás seguro de que deseas eliminar este grupo?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                console.log(`Eliminando grupo: ${groupId}`);
                toast.success("Grupo eliminado correctamente");
              }}

            >
              Eliminar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}

            >
              Cancelar
            </button>
          </div>
        </div>

*/
