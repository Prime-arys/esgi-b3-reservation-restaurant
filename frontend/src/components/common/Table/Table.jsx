import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

const Table = ({
  data = [],
  columns = [],
  className = '',
  striped = true,
  bordered = true,
  hover = true,
  responsive = true,
  emptyMessage = 'No data available',
  onRowClick,
  customFormatters = {},
  sortable = false,
  sortBy,
  sortOrder,
  onSort
}) => {
  // Default formatters for special values
  const defaultFormatters = {
    date: (value) => {
      if (!value) return '-';
      const date = new Date(value);
      return date.toLocaleDateString();
    },
    datetime: (value) => {
      if (!value) return '-';
      const date = new Date(value);
      return date.toLocaleString();
    },
    currency: (value) => {
      if (value === null || value === undefined) return '-';
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(value);
    },
    number: (value) => {
      if (value === null || value === undefined) return '-';
      return Number(value).toLocaleString('fr-FR');
    },
    boolean: (value) => {
      if (value === null || value === undefined) return '-';
      return value ? 'Oui' : 'Non';
    },
    status: (value) => {
      if (!value) return '-';
      return (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          {value}
        </span>
      );
    },
    email: (value) => {
      if (!value) return '-';
      return <a href={`mailto:${value}`}>{value}</a>;
    },
    phone: (value) => {
      if (!value) return '-';
      return <a href={`tel:${value}`}>{value}</a>;
    },    truncate: (value, maxLength = 50) => {
      if (!value) return '-';
      const str = String(value);
      return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
    },
    actions: (value, row, column) => {
      if (!column.actions || !Array.isArray(column.actions)) return '-';
      
      return (
        <div className="table-actions">
          {column.actions.map((action, index) => (
            <button
              key={index}
              className={`action-btn ${action.className || ''} ${action.variant ? `btn-${action.variant}` : 'btn-primary'}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click
                if (action.onClick) action.onClick(row, action);
              }}
              disabled={action.disabled ? action.disabled(row) : false}
              title={action.tooltip}
              style={action.style}
            >
              {action.icon && <span className={`action-icon ${action.icon}`}></span>}
              {action.label}
            </button>
          ))}
        </div>
      );
    },
    button: (value, row, column) => {
      return (
        <button
          className={`table-btn ${column.buttonClass || ''} ${column.variant ? `btn-${column.variant}` : 'btn-primary'}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click
            if (column.onClick) column.onClick(row, value);
          }}
          disabled={column.disabled ? column.disabled(row, value) : false}
          title={column.tooltip}
          style={column.style}
        >
          {column.icon && <span className={`btn-icon ${column.icon}`}></span>}
          {column.label || value}
        </button>
      );
    }
  };

  // Merge custom formatters with default ones
  const formatters = { ...defaultFormatters, ...customFormatters };
  // Format cell value based on column type
  const formatCellValue = (value, column, row) => {
    if (column.formatter && typeof column.formatter === 'function') {
      return column.formatter(value, row, column);
    }
    
    if (column.type && formatters[column.type]) {
      return formatters[column.type](value, row, column);
    }

    if (value === null || value === undefined) {
      return '-';
    }

    return value;
  };

  // Handle column sorting
  const handleSort = (column) => {
    if (!sortable || !column.sortable || !onSort) return;
    
    const newSortOrder = sortBy === column.key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(column.key, newSortOrder);
  };

  // Get sort icon
  const getSortIcon = (column) => {
    if (!sortable || !column.sortable) return null;
    
    if (sortBy === column.key) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↕';
  };

  // Build table classes
  const tableClasses = [
    'custom-table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    hover && 'table-hover',
    className
  ].filter(Boolean).join(' ');

  // Build wrapper classes
  const wrapperClasses = [
    'table-wrapper',
    responsive && 'table-responsive'
  ].filter(Boolean).join(' ');

  if (!data || data.length === 0) {
    return (
      <div className={wrapperClasses}>
        <div className="table-empty">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <table className={tableClasses}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  ${column.className || ''}
                  ${column.sortable && sortable ? 'sortable' : ''}
                  ${column.align ? `text-${column.align}` : ''}
                `}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  ...column.style
                }}
                onClick={() => handleSort(column)}
              >
                {column.title}
                {getSortIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={onRowClick ? 'clickable-row' : ''}
              onClick={() => onRowClick && onRowClick(row, rowIndex)}
            >
              {columns.map((column) => {
                const cellValue = column.key.includes('.') 
                  ? column.key.split('.').reduce((obj, key) => obj?.[key], row)
                  : row[column.key];

                return (
                  <td
                    key={column.key}
                    className={`
                      ${column.className || ''}
                      ${column.align ? `text-${column.align}` : ''}
                    `}                    style={column.style}
                  >
                    {formatCellValue(cellValue, column, row)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,      
      type: PropTypes.string,
      formatter: PropTypes.func,
      formatOptions: PropTypes.object,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      minWidth: PropTypes.string,
      maxWidth: PropTypes.string,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      className: PropTypes.string,
      style: PropTypes.object,
      // Button column props
      onClick: PropTypes.func,
      disabled: PropTypes.func,
      variant: PropTypes.string,
      buttonClass: PropTypes.string,
      icon: PropTypes.string,
      label: PropTypes.string,
      tooltip: PropTypes.string,
      // Actions column props
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          icon: PropTypes.string,
          onClick: PropTypes.func,
          disabled: PropTypes.func,
          variant: PropTypes.string,
          className: PropTypes.string,
          style: PropTypes.object,
          tooltip: PropTypes.string
        })
      )
    })
  ).isRequired,
  className: PropTypes.string,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onRowClick: PropTypes.func,
  customFormatters: PropTypes.object,
  sortable: PropTypes.bool,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func
};

export default Table;