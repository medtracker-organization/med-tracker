import { useState, useEffect } from "react";
import DeleteSvg from "./deleteSvg";

export default function AddMedicationModal({ open, onClose, onSave }) {
  const [hours, setHours] = useState([""]);
  const [formData, setFormData] = useState({
    name: "",
    dose: "",
    frequency: "1",
  });

  useEffect(() => {
    if (open) {
      setFormData({ name: "", dose: "", frequency: "1" });
      setHours([""]);
    }
  }, [open]);

  const updateHour = (i, value) => {
    const updated = [...hours];
    updated[i] = value;
    setHours(updated);
  };

  const removeHour = (i) => {
    setHours(hours.filter((_, index) => index !== i));
  };

  const addHour = () => setHours([...hours, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dose) return;

    const data = new FormData(e.target);
    const med = {
      id: crypto.randomUUID(),
      name: data.get("name"),
      dose: data.get("dose"),
      frequency: data.get("frequency"),
      hours,
      taken: [],
      createdAt: Date.now(),
    };

    onSave(med);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md bg-[#1B2559] max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-xl border border-white/10 animate-modalIn">
        <h2 className="text-xl font-semibold text-white font-PolySans">
          Ajouter un médicament
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            name="name"
            className="w-full p-3 rounded-lg bg-[#0f1535] border border-[#8F9BBA]/20 text-white"
            placeholder="Nom"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            name="dose"
            className="w-full p-3 rounded-lg bg-[#0f1535] border border-[#8F9BBA]/20 text-white"
            placeholder="Dose (ex: 500mg)"
            required
            value={formData.dose}
            onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
          />

          <select
            name="frequency"
            className="w-full p-3 rounded-lg bg-[#0f1535] border border-[#8F9BBA]/20 text-white"
            required
            value={formData.frequency}
            onChange={(e) =>
              setFormData({ ...formData, frequency: e.target.value })
            }
          >
            <option value="1">1x/jour</option>
            <option value="2">2x/jour</option>
            <option value="3">3x/jour</option>
          </select>

          <div>
            <label className="text-white">Heures de prise :</label>
            <div className="space-y-3 mt-2">
              {hours.map((h, i) => (
                <div key={i} className="flex items-center space-x-3 animate-modalIn">
                  <input
                    type="time"
                    required
                    className="flex-1 p-3 rounded-lg bg-[#0f1535] border border-[#8F9BBA]/20 text-white"
                    value={h}
                    onChange={(e) => updateHour(i, e.target.value)}
                  />
                  {hours.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHour(i)}
                      className=""
                    >
                      <DeleteSvg />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addHour}
                className="text-sm text-[#A3AED0] underline"
              >
                + Ajouter une heure
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#8F9BBA]"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#4318FF] text-white rounded-xl"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
