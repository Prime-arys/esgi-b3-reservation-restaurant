// import { AuthContext } from "../../utils/AuthContext";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {deleteReservation, validateReservation, getReservations} from "../api/Reservations.js";
import Table from "../components/common/Table/Table.jsx";

function Reservations() {
    const queryClient = useQueryClient();
    const {isPending, data: reservations} = useQuery({
        queryKey: ["reservations"],
        queryFn: getReservations,
        refetchOnWindowFocus: false,
    });

    const {mutate: deleteReservationMutation} = useMutation({
        mutationFn: (id) => deleteReservation(id),
        onSuccess: () => {
            // Refetch the reservations after deletion
            queryClient.invalidateQueries({queryKey: ["reservations"]});
        },
        onError: (error) => {
            console.error("Error deleting reservation:", error);
        },
    });

    const {mutate: validateReservationMutation} = useMutation({
        mutationFn: (id) => validateReservation(id),
        onSuccess: () => {
            // Refetch the reservations after validation
            queryClient.invalidateQueries({queryKey: ["reservations"]});
        },
        onError: (error) => {
            console.error("Error validating reservation:", error);
        },
    });

    if (isPending) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!reservations || reservations.length === 0) {
        return (
            <div>
                <h2>Aucune réservation trouvée.</h2>
            </div>
        );
    }

    return (
        <>
            <h1>Réservations</h1>
            <Table
                data={reservations}
                columns={[
                    {
                        key: 'fname',
                        title: 'Prénom',
                        className: 'text-left',
                    },
                    {
                        key: 'lname',
                        title: 'Nom',
                        className: 'text-left',
                    },
                    {
                        key: 'email',
                        title: 'Email',
                        className: 'text-left',
                    },
                    {
                        key: 'phone',
                        title: 'Numéro de téléphone',
                        className: 'text-left',
                    },
                    {
                        key: 'number_of_people',
                        title: 'Nombre de personnes',
                        className: 'text-left',
                    },
                    {
                        key: 'date_',
                        title: 'Date',
                        type: 'date',
                        className: 'text-center',
                    },
                    {
                        key: 'time_',
                        title: 'Heure',
                        type: 'time',
                        className: 'text-center',
                    },
                    {
                        key: 'status',
                        title: 'Statut',
                        type: 'status',
                        className: 'text-center',
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
                            },
                            {
                                label: 'Valider',
                                icon: 'edit',
                                variant: 'outline-primary',
                                onClick: (row) => {
                                    if (confirm(`Êtes-vous sûr de vouloir valider la réservation ?`)) {
                                        validateReservationMutation(row.reservation_id);
                                    }
                                },
                                tooltip: 'Valider la réservation'
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
        </>
    );
}

export default Reservations;