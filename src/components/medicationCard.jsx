import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteSvg from "./deleteSvg";

export default function MedicationCard({ medication, onCheck, onDelete }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = () => {
    setOpenConfirm(false);
    onDelete(medication.id);
  };
  return (
    <div className="bg-[#0f1535] border border-[#8F9BBA]/20 p-4 rounded-xl mb-4">

      {/* dialogue de confirmation */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Supprimer</DialogTitle>
        <DialogContent>
          Voulez-vous vraiment supprimer ce médicament ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Annuler</Button>
          <Button color="error" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg text-white font-PolySans">
            {medication.name}
          </h3>
          <p className="text-[#A3AED0] text-sm">
            {medication.dose} — {medication.frequency}x/jour
          </p>
        </div>
        <button
          type="button"
           onClick={() => setOpenConfirm(true)}
          className=""
        >
          <DeleteSvg />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {medication.hours
        .sort((a, b) => a.localeCompare(b))
        .map((hour) => {
          const done = medication.taken.includes(hour);

          return (
            <div
              key={hour}
              className={`flex justify-between items-center p-3 rounded-lg ${
                done
                  ? "bg-green-500/20 border border-green-400/30"
                  : "bg-[#1B2559] border border-[#8F9BBA]/10"
              }`}
            >
              <span className="text-white text-sm">{hour}</span>

              <button
                onClick={() => onCheck(medication.id, hour)}
                className={`text-xs px-3 py-1 rounded-lg ${
                  done ? "bg-green-600 text-white" : "bg-[#4318FF] text-white"
                }`}
              >
                {done ? "Fait" : "À faire"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
