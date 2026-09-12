import type { CSSProperties, ReactNode } from 'react';

export interface LegendItem {
  label: string | ReactNode;
  className: string;
}

export interface CalendarLegendProps {
  items?: LegendItem[];
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_LEGEND_ITEMS: LegendItem[] = [
  { label: 'Dates Sélectionnées', className: 'fldp-legend-box--selected' },
  { label: 'Disponibilité', className: 'fldp-legend-box--available' },
  { label: 'Pas De Disponibilité', className: 'fldp-legend-box--unavailable' },
  { label: 'Séjour Minimal', className: 'fldp-legend-box--minimal-stay' },
  { label: "Pas D'Arrivée", className: 'fldp-legend-box--no-arrival' },
];

export function CalendarLegend({
  items = DEFAULT_LEGEND_ITEMS,
  className,
  style,
}: CalendarLegendProps) {
  return (
    <div className={`fldp-calendar-legend ${className || ''}`} style={style}>
      {items.map((item, index) => (
        <div key={index} className="fldp-legend-item">
          <div className={`fldp-legend-box ${item.className}`} />
          <span className="fldp-legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
