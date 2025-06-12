import InputField from "../components/common/InputField/InputField";
import { useQuery } from "@tanstack/react-query";
import { getSlotInfo } from "../api/SlotInfo";
import CustomButton from "../components/common/Button/CustomButton";
import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";

const NewRegistration = () => {
  const Context = useContext(AuthContext);
  console.log(Context);
  const { isPending, data: slots } = useQuery({
    queryKey: ["slots"],
    queryFn: getSlotInfo,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = () => {
    const selectedSlot = document.querySelector("select").value;
    const numberOfPeople = document.querySelector("input[type='number']").value;

    if (selectedSlot && numberOfPeople) {
      const reservationData = {
        user_id: 1,
        slot_id: selectedSlot,
        number_of_people: numberOfPeople,
        date: selectedSlot.split("T")[0],
        time: selectedSlot.split("T")[1] === "" ? "00:00:00" : selectedSlot.split("T")[1],
        status: "PENDING",
      };
      fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
        credentials: "include",
      });
    } else {
      console.error("Please fill in all fields.");
    }
  };

  return (
    <div>
      <h1>Nouvelle réservation</h1>
      <p>Ceci est la page de création d'une nouvelle réservation.</p>
      <InputField placeholder="Nombre de personnes" type="number" />

      {isPending ? (
        <p>Chargement des créneaux disponibles...</p>
      ) : slots && slots.length > 0 ? (
        <div>
          <select>
            {slots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.date_time.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <p>Aucun créneau disponible pour le moment.</p>
        </div>
      )}

      <CustomButton
        buttonText="Valider la réservation"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default NewRegistration;
