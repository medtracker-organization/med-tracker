import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grow,
} from "@mui/material";
import DeleteSvg from "./deleteSvg";

export default function MedicationCard({ medication, onCheck, onDelete }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = () => {
    setOpenConfirm(false);
    onDelete(medication.id);
  };

  return (
    <div className="bg-[#0f1535] border border-[#8F9BBA]/20 p-4 rounded-xl mb-4 animate-modalIn">
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        TransitionComponent={Grow}
        transitionDuration={300}
      >
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
          <h3 className="text-lg text-white font-PolySans mb-1">
            {medication.name}
          </h3>
          <p className="text-[#A3AED0] text-sm">
            {medication.dose} — {medication.frequency}x/jour
          </p>
        </div>

        <button onClick={() => setOpenConfirm(true)}>
          <DeleteSvg />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {medication.hours.sort().map((hour) => {
          const done = medication.taken.includes(hour);

          // rend la bordure rouge pour les prises en retard
          const isLate = () => {
            const now = new Date();
            const [h, m] = hour.split(":").map(Number);

            const medTime = new Date();
            medTime.setHours(h, m, 0);

            return medTime < now && !done;
          };

          return (
            <div
              key={hour}
              className={`flex justify-between items-center p-3 rounded-lg 
              ${
                done
                  ? "bg-green-500/20 border border-green-400/30"
                  : isLate()
                  ? "bg-red-500/10 border border-red-500/40"
                  : "bg-[#1B2559] border border-[#8F9BBA]/10"
              }`}
            >
              <span className="text-white text-sm">{hour}</span>

              <button
                onClick={() => onCheck(medication.id, hour)}
                className={`text-xs px-3 py-1 rounded-lg text-white transition-all duration-900 transform active:scale-205 hover:opacity-90  ${
                  done ? "bg-green-600" : "bg-[#4318FF]"
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
