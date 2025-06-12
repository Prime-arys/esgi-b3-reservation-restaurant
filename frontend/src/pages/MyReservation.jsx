import { Reservation } from "../models/MyReservation";
import { getMyReservations } from "../api/MyReservation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservation } from "../api/Reservations";
import Table from "../components/common/Table/Table";



function MyReservation() {
    //const Context  = useContext(AuthContext);
    const queryClient = useQueryClient();
    const { isPending, data: reservations } = useQuery({
        queryKey: ["my-reservations"],
        queryFn: getMyReservations,
        refetchOnWindowFocus: true,
    });

    const { mutate: deleteReservationMutation } = useMutation({
        mutationFn: (id) => deleteReservation(id),
        onSuccess: () => {
            // Refetch the reservations after deletion
            queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
        },
        onError: (error) => {
            console.error("Error deleting reservation:", error);
        },
    });

    if (isPending) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div>
                <h2>Vous n'avez pas de réservations.</h2>
            </div>
        );
    }

    return (
        <div>
            <h2>My Reservations</h2>

            <Table
                data={reservations}
                columns={[
                    {
                        key: "number_of_people",
                        title: "Number of People",
                        className: "text-left",
                    },
                    {
                        key: "date_",
                        title: "Date",
                        className: "text-center",
                        type: 'date',
                    },
                    {
                        key: "time_",
                        title: "Time",
                        className: "text-center",
                        type: 'time',
                    },
                    {
                        key: "status",
                        title: "Status",
                        className: "text-center",
                        type: 'status',
                    },
                    {
                        key: 'actions',
                        title: 'Actions',
                        type: 'actions',
                        align: 'center',
                        width: '200px',
                        actions: [
                            {
                                label: 'Supprimer',
                                icon: '🗑️',
                                variant: 'outline-danger',
                                onClick: (row) => {
                                    if (confirm(`Êtes-vous sûr de vouloir supprimer la réservation ?`)) {
                                        deleteReservationMutation(row.reservation_id);
                                    }
                                },
                                tooltip: 'Supprimer la réservation'
                            }
                        ]
                    }
                ]}
                emptyMessage="Aucune réservation trouvée"
                sortable={true}
                sortBy="date"
                sortOrder="asc"
                onSort={(columnKey, order) => {
                    console.log(`Sorting by ${columnKey} in ${order} order`);
                }}
                responsive={true}
                striped={true}
                bordered={true}
                hover={true}
            />

        </div>
    );

}
export default MyReservation;