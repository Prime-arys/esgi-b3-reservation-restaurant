/**
 * Example usage of the Table component
 * 
 * This file demonstrates how to use the customizable Table component
 * with different data types and formatters.
 */

import React, { useState } from 'react';
import Table from './Table';

const TableExample = () => {
  // Sample data
  const [data] = useState([
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33123456789',
      reservationDate: '2024-06-15T19:30:00Z',
      guests: 4,
      status: 'confirmed',
      amount: 89.50,
      isVip: true,
      table: { number: 12, section: 'VIP' }
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '+33987654321',
      reservationDate: '2024-06-16T20:00:00Z',
      guests: 2,
      status: 'pending',
      amount: 45.00,
      isVip: false,
      table: { number: 8, section: 'Main' }
    },
    {
      id: 3,
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      phone: '+33555123456',
      reservationDate: '2024-06-17T18:45:00Z',
      guests: 6,
      status: 'cancelled',
      amount: null,
      isVip: false,
      table: { number: 15, section: 'Terrace' }
    }
  ]);

  // Define table columns
  const columns = [
    {
      key: 'name',
      title: 'Nom',
      sortable: true,
      width: '150px'
    },
    {
      key: 'email',
      title: 'Email',
      type: 'email',
      sortable: true
    },
    {
      key: 'phone',
      title: 'Téléphone',
      type: 'phone'
    },
    {
      key: 'reservationDate',
      title: 'Date de réservation',
      type: 'datetime',
      sortable: true,
      width: '180px'
    },
    {
      key: 'guests',
      title: 'Invités',
      type: 'number',
      align: 'center',
      width: '80px'
    },
    {
      key: 'status',
      title: 'Statut',
      type: 'status',
      align: 'center',
      width: '100px'
    },
    {
      key: 'amount',
      title: 'Montant',
      type: 'currency',
      align: 'right',
      width: '100px'
    },
    {
      key: 'isVip',
      title: 'VIP',
      type: 'boolean',
      align: 'center',
      width: '60px'
    },    {
      key: 'table.number',
      title: 'Table',
      formatter: (value) => `Table ${value}`,
      align: 'center',
      width: '80px'
    },
    {
      key: 'actions',
      title: 'Actions',
      type: 'actions',
      align: 'center',
      width: '200px',
      actions: [
        {
          label: 'Voir',
          icon: '👁️',
          variant: 'outline-primary',
          onClick: (row) => {
            console.log('Voir réservation:', row);
            alert(`Voir détails de ${row.name}`);
          },
          tooltip: 'Voir les détails'
        },
        {
          label: 'Modifier',
          icon: '✏️',
          variant: 'outline-secondary',
          onClick: (row) => {
            console.log('Modifier réservation:', row);
            alert(`Modifier réservation de ${row.name}`);
          },
          disabled: (row) => row.status === 'cancelled',
          tooltip: 'Modifier la réservation'
        },
        {
          label: 'Supprimer',
          icon: '🗑️',
          variant: 'outline-danger',
          onClick: (row) => {
            if (confirm(`Êtes-vous sûr de vouloir supprimer la réservation de ${row.name} ?`)) {
              console.log('Supprimer réservation:', row);
              alert(`Réservation de ${row.name} supprimée`);
            }
          },
          tooltip: 'Supprimer la réservation'
        }
      ]
    }
  ];

  // Single button column example
  const columnsWithButton = [
    ...columns.slice(0, -1), // All columns except actions
    {
      key: 'confirm',
      title: 'Confirmation',
      type: 'button',
      label: 'Confirmer',
      variant: 'success',
      icon: '✅',
      align: 'center',
      width: '120px',
      onClick: (row) => {
        console.log('Confirmer réservation:', row);
        alert(`Réservation de ${row.name} confirmée`);
      },
      disabled: (row) => row.status === 'confirmed' || row.status === 'cancelled',
      tooltip: 'Confirmer la réservation'
    }
  ];

  // Custom formatters example
  const customFormatters = {
    // Custom formatter for special cases
    specialStatus: (value) => {
      const statusMap = {
        'confirmed': '✅ Confirmé',
        'pending': '⏳ En attente',
        'cancelled': '❌ Annulé'
      };
      return statusMap[value] || value;
    }
  };

  // Sorting state
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  // Handle sorting
  const handleSort = (columnKey, order) => {
    setSortBy(columnKey);
    setSortOrder(order);
    
    // Here you would typically sort your data
    console.log(`Sorting by ${columnKey} in ${order} order`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Exemple de Table Personnalisable</h2>
        <h3>Table avec Boutons d'Action</h3>
      <Table
        data={data}
        columns={columns}
        sortable={true}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        emptyMessage="Aucune réservation trouvée"
      />

      <h3>Table avec Bouton Simple</h3>
      <Table
        data={data.filter(item => item.status === 'pending')}
        columns={columnsWithButton}
        emptyMessage="Aucune réservation en attente"
      />

      <h3>Table Sans Bordures et Rayures</h3>
      <Table
        data={data.slice(0, 2)}
        columns={columns.slice(0, 5)}
        bordered={false}
        striped={false}
        hover={false}
      />      <h3>Table avec Formatters Personnalisés et Actions Avancées</h3>
      <Table
        data={[{
          id: 1,
          name: 'Test User',
          description: 'Une très longue description qui devrait être tronquée car elle dépasse la limite de caractères autorisée',
          specialStatus: 'confirmed',
          quickActions: 'actions'
        }]}
        columns={[
          { key: 'name', title: 'Nom' },
          { 
            key: 'description', 
            title: 'Description',
            type: 'truncate',
            formatOptions: 30
          },
          {
            key: 'specialStatus',
            title: 'Statut Spécial',
            type: 'specialStatus'
          },
          {
            key: 'quickActions',
            title: 'Actions Rapides',
            type: 'actions',
            align: 'center',
            actions: [
              {
                label: 'Edit',
                variant: 'primary',
                className: 'btn-sm',
                onClick: (row) => alert(`Edit ${row.name}`)
              },
              {
                label: 'Delete',
                variant: 'danger',
                className: 'btn-sm',
                onClick: (row) => alert(`Delete ${row.name}`)
              }
            ]
          }
        ]}
        customFormatters={customFormatters}
      />

      <h3>Table avec Click sur Ligne et Actions</h3>
      <Table
        data={data.slice(0, 2)}
        columns={columns.slice(0, 6)} // Without actions column
        onRowClick={(row) => alert(`Ligne cliquée: ${row.name}`)}
        emptyMessage="Aucune donnée"
      />

      <h3>Table Vide</h3>
      <Table
        data={[]}
        columns={columns}
        emptyMessage="🍽️ Aucune réservation pour le moment"
      />
    </div>
  );
};

export default TableExample;
