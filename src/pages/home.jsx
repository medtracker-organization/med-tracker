import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import MedicationCard from "../components/medicationCard";
import AddMedicationModal from "../components/addMedicationModal";
import {
  Snackbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [medications, setMedications] = useLocalStorage("medications", []);
  const [toast, setToast] = useState({ open: false, message: "" });

  const addMedication = (med) => {
    setMedications([...medications, med]);
    setToast({ open: true, message: "Médicament ajouté !" });
  };

  const deleteMedication = (id) => {
    setMedications(medications.filter((m) => m.id !== id));
    setToast({ open: true, message: "Médicament supprimé !" });
  };

  const check = (id, hour) => {
    setMedications(
      medications.map((m) =>
        m.id === id
          ? {
              ...m,
              taken: m.taken.includes(hour)
                ? m.taken.filter((h) => h !== hour)
                : [...m.taken, hour],
            }
          : m
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#1B2559] p-5">
      <div className="max-w-xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-white font-PolySans">MedTracker</h1>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-[#4318FF] rounded-xl text-white"
          >
            Ajouter
          </button>
        </header>

        <div>
          {medications.length === 0 ? (
            <p className="text-[#8F9BBA] text-center mt-20">
              Aucun médicament. Cliquez sur "Ajouter".
            </p>
          ) : (
            medications.map((m) => (
              <MedicationCard
                key={m.id}
                medication={m}
                onCheck={check}
                onDelete={deleteMedication}
              />
            ))
          )}
        </div>
      </div>

      <AddMedicationModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={addMedication}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity="success" variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
